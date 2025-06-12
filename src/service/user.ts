import { client } from "./sanity";

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export const addUser = async ({
  id,
  username,
  email,
  name,
  image,
}: OAuthUser) => {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    email,
    name,
    username,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
};

export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
    ...,
    "id":_id,
    following[] -> {username, image},
    followers[] -> {username, image},
    "bookmarks": bookmarks[]->_id
    }`,
  );
  // return client.fetch()
}
