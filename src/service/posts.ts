import { SimplePost } from "@/models/post";
import { client, urlFor } from "./sanity";

// TODO: "comments"는 현재페이지에 로그인사용자 comment도 포함인걸로알고는데, 이거 -1해야되는거 아닌지 확인
const simplePostProjection = `
  ...,
  "id": _id,
  "username": author->username,
  "userImage": author->image,
  "image": photo,
  "likes": likes[]->username,
  "text": comments[0].comment,
  "comments": count(comments),
  "createdAt": _createdAt
`;

const mapPosts = (posts: SimplePost[]) => {
  return posts.map((post) => ({
    ...post,
    image: urlFor(post.image),
  }));
};

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `
    *[_type == "post" && author->username == "${username}" 
      || author._ref in *[_type == "user" && username == "${username}"][0]
         .following[]._ref]
      | order(_createdAt desc){${simplePostProjection}}
    `,
    )
    .then(mapPosts);
  // .then((posts) =>
  //   posts.map((post: SimplePost) => ({
  //     ...post,
  //     image: urlFor(post.image),
  //   })),
  // );
}

export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id =="${id}"][0]{
    ...,
    "username":author->username,
    "userImage":author->image,
    "image":photo,
    "likes": likes[]->username,
    comments[]{comment, "username":author->username, "image": author->image},
    "id": _id,
    "createdAt": _createdAt
  }
    `,
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author -> username == "${username}"]
    | order(_createdAt desc){
      ${simplePostProjection}
    }`,
    )
    .then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[] -> username]
    | order(_createdAt desc){
      ${simplePostProjection}
    }`,
    )
    .then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type == "user" && username == "${username}"]
         .bookmarks[]._ref]
    | order(_createdAt desc){
      ${simplePostProjection}
    }`,
    )
    .then(mapPosts);
}

// export async function getFollowingPostsRawOf(username: string) {
//   return client.fetch(`
//     *[_type == "post" && author->username == "${username}"
//       || author._ref in *[_type == "user" && username == "${username}"][0]
//          .following[]._ref]
//       | order(_createdAt desc)
//     `);
// }

// ** the others query example **
//     `*[_type == "post" && author->username
//     in *[_type == "user" && username =="${username}"][0]
//     .following[]->username]{
//       ...,
//       "id": _id,
//       "username": author->username,
//       "userImage": author->image,
//       "image": photo,
//       "likes": likes[]->username,
//       "comments": comments[]{comment, "username": author->username},
//       "createdAt": _createdAt
//     }`,

// *[
// _type=="post" && author->username == "${username}" ||
// author._ref in *[_type == "user" && username == "${username}"]
// .following[]._ref
// ]
