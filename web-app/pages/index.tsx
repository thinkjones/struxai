import UploadPanel from '@/components/UploadPanel';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Head from 'next/head';
import styled from 'styled-components'
import { Auth, API } from "aws-amplify";
import React, { useState, useEffect } from "react";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

const { Header, Footer, Sider, Content } = Layout;

const Logo = styled.div`
  background: transparent;
  border-radius: 3px;
  color: pink;
  float: left;
  font-size: 25px;
  margin-right: 30px;
`

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState("signup");

  // Get the current logged in user info
  const getUser = async () => {
    const user = await Auth.currentUserInfo();
    if (user) setUser(user);
    setLoading(false);
  };

  // Logout the authenticated user
  const signOut = async () => {
    await Auth.signOut();
    setUser(null);
  };

  // Send an API call to the /public endpoint
  const publicRequest = async () => {
    const response = await API.get("api", "/public");
    alert(JSON.stringify(response));
  };


  // Send an API call to the /private endpoint with authentication details.
  const privateRequest = async () => {
    try {
      const response = await API.get("api", "/private", {
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      });
      alert(JSON.stringify(response));
    } catch (error) {
      alert(error);
    }
  };


  // Check if there's any user on mount
  useEffect(() => {
    getUser();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (loading) return <div className="container">Loading...</div>;

  return (
    <>
      <Head>
        <title>Strux AI</title>
        <meta name="description" content="What can we learn from your docs?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout style={{ height: "100vh" }}>
        <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', marginBottom: "10px" }}>
          <Logo>STRUX AI</Logo>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px' }} >
          {user ? (
            <div className="profile">
              <p>Welcome {user.attributes.given_name}!</p>
              <p>{user.attributes.email}</p>
              <button onClick={signOut}>logout</button>
            </div>
          ) : (
            <div>
              {screen === "signup" ? (
                <Signup setScreen={setScreen} />
              ) : (
                <Login setScreen={setScreen} setUser={setUser} />
              )}
            </div>
          )}
          <div className="api-section">
            <button onClick={publicRequest}>call /public</button>
            <button onClick={privateRequest}>call /private</button>
          </div>
          <div style={{ padding: 24, minHeight: 380, height: "100vh-150px", background: colorBgContainer }}>
            Upload a document and perform some AI-ML on it.
            <UploadPanel />
          </div>
          <div>
            <div>NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID: {process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID}</div>            
            <div>NEXT_PUBLIC_USER_POOL_ID: {process.env.NEXT_PUBLIC_USER_POOL_ID}</div>
            <div>NEXT_PUBLIC_USER_POOL_CLIENT_ID: {process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}</div>
            <div>NEXT_PUBLIC_AUTH_API_URL: {process.env.NEXT_PUBLIC_AUTH_API_URL}</div>
            <div>NEXT_PUBLIC_REGION: {process.env.NEXT_PUBLIC_REGION}</div>
            <div>NEXT_PUBLIC_UPLOAD_BUCKET: {process.env.NEXT_PUBLIC_UPLOAD_BUCKET}</div>
            
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2023 Created by Gene Conroy-Jones</Footer>
      </Layout>
    </>
  )
}



