import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import SignUp from './pages/SignUp';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Login from './pages/LogIn';
import EstateDetails from './pages/EstateDetails';
import WishList from './pages/WishList';
import AddListing from './pages/AddListing';
import MyProfile from './pages/MyProfile';
import RoleBasedRoute from './components/auth/RoleBaseRoute';
import Search from './pages/Search';
import UnAuthorized from './ui/unAuthorized';
import NotFound from './ui/NotFound';
import toast, { Toaster } from 'react-hot-toast';
import ErrorPage from './pages/ErrorPage';
import EditLisiting from './pages/EditLisiting';

// Create a client

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      console.error('Query Error:', error);

      if (error?.response?.status === 401) {
        toast.error('Unauthorized! Please login.');
        window.location.href = '/login'; // redirect
      } else if (error?.response?.status === 403) {
        toast.error('Access denied!');
        window.location.href = '/unAuthorized';
      } else if (error?.response?.status === 404) {
        toast.error('Resource not found!');
        window.location.href = '/404';
      } else {
        try {
          toast.error(JSON.parse(error.message).message || 'Something went wrong!');
        } catch {
          toast.error('Something went wrong!');
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      console.error('Mutation Error:', error);
      try {
        toast.error(JSON.parse(error.message).message || 'Mutation failed!');
      } catch {
        toast.error('Mutation failed!');
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false, // disable automatic retry
    },
    mutations: {
      retry: false,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="estateDetails/:type/:id" element={<EstateDetails />} />
        <Route path="search" element={<Search />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<MyProfile />} />
          <Route path="wishList" element={<WishList />} />

          {/* agent routes */}
          <Route element={<RoleBasedRoute allowedRoles={['Admin', 'Agent']} />}>
            <Route path="edit/property/:propertyType/:propertyId" element={<EditLisiting />} />
            <Route path="add" element={<AddListing />} />
          </Route>
        </Route>
      </Route>

      {/* login & signup layout */}
      <Route>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="unAuthorized" element={<UnAuthorized />} />
        <Route path="error" element={<ErrorPage />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" reverseOrder={false} />
      <ErrorBoundary>
        <AuthProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
