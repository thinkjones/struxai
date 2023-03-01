import UploadPanel from '@/components/UploadPanel';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Head from 'next/head';
import styled from 'styled-components'

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

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
          <div style={{ padding: 24, minHeight: 380, height: "100vh-150px", background: colorBgContainer }}>
            Upload a document and perform some AI-ML on it.
            <UploadPanel />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2023 Created by Gene Conroy-Jones</Footer>
      </Layout>
    </>
  )
}



