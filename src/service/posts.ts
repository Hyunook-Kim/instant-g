import { client } from "./sanity";

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

export async function getFollowingPostsOf(username: string) {
  return client.fetch(`
    *[_type == "post" && author->username == "${username}" 
      || author._ref in *[_type == "user" && username == "${username}"][0]
         .following[]._ref]
      | order(_createdAt desc){${simplePostProjection}}
    `);
}

export async function getFollowingPostsRawOf(username: string) {
  return client.fetch(`
    *[_type == "post" && author->username == "${username}" 
      || author._ref in *[_type == "user" && username == "${username}"][0]
         .following[]._ref]
      | order(_createdAt desc)
    `);
}

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
