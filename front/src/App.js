import { Body } from "./containers/body/body";
import { AddArticle } from "./components/addArticle/addArticle";
import  PostContainer  from "./containers/post/post";
import { UserProfileCon } from "./containers/userProfile/userProfile";
import { PostID } from "./components/postID/postID";
import { PostSTR } from "./components/postID/postSTR";
import { PostFILE } from "./components/postID/postFILE";
import { PostDATA } from "./components/postID/postDATA";
import { ProfileUserCon } from "./containers/ProfileUser/ProfileUser"
import UsersContainer from "./containers/users/users"
import UserContainer from "./containers/users/user"
import PostIdContainer from "./containers/post/postId";
import AuthContainer from "./containers/auth/auth";


import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";




function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <Body />
          <Routes>
            {/* <Route path="/" element={<Body />}/> */}
            <Route path="/" element={<AuthContainer />}/>
            {/* <Route path='/auth' element={<AuthContainer />} /> */}
            <Route path="addArticle" element={<AddArticle />} />
            <Route path="posts" element={<PostContainer />} />
            <Route path="posts/:id" element={<PostIdContainer />} />
            <Route path="profile/:id" element={<UserProfileCon />} />
            {/* <Route path="users/:id" element={<UserProfileCon />} /> */}
            <Route path="users" element={<UsersContainer />} />
            <Route path="users/:id" element={<UserContainer />} />
            <Route path="profile/user" element={<ProfileUserCon/>} />
            

            <Route path="posts/add" element={<AddArticle />} />
            {/* <Route path="articlestr/:str" element={<PostSTR />} />
            <Route path="articlefile/:file" element={<PostFILE />} />
            <Route path="articledata/:data" element={<PostDATA />} /> */}
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
