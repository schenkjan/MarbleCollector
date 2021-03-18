import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

// export const GetQuery = async (bearerToken: any, url: any): Promise<[]> => {
//   const { data } = await axios.get(`${apiBaseUrl}${url}`, {
//     headers: {
//       Authorization: `Bearer ${bearerToken}`,
//     },
//   });
//   return data;
// };

// export const GetSingleQuery = async (
//   bearerToken: any,
//   url: any
// ): Promise<[]> => {
//   const { data } = await axios.get(`${apiBaseUrl}${url}`, {
//     headers: {
//       Authorization: `Bearer ${bearerToken}`,
//     },
//   });
//   return data;
// };

// export const PostQuery = async (
//   bearerToken: any,
//   url: any,
//   body: any
// ): Promise<[]> => {
//   const { data } = await axios.post(`${apiBaseUrl}${url}`, {
//     headers: {
//       Authorization: `Bearer ${bearerToken}`,
//     },
//     body: body,
//   });
//   return data;
// };

// export const PutSingleQuery = async (
//   bearerToken: any,
//   url: any,
//   body: any
// ): Promise<[]> => {
//   const { data } = await axios.put(`${apiBaseUrl}${url}`, {
//     headers: {
//       Authorization: `Bearer ${bearerToken}`,
//     },
//     body: body,
//   });
//   return data;
// };

// export const DeleteSingleQuery = async (
//   bearerToken: any,
//   url: any
// ): Promise<[]> => {
//   const { data } = await axios.put(`${apiBaseUrl}${url}`, {
//     headers: {
//       Authorization: `Bearer ${bearerToken}`,
//     },
//   });
//   return data;
// };

// export const UpdatePost = async (body) => {
//     const bearerToken = useRecoilValue(AppState.userBearerToken);
//     const {data} = await axios.put(`http://localhost:5050/posts/${body.id}`, body.body);
//     return data
// }
