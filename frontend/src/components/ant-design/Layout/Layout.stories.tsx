import React from 'react';
import { Box } from '@components/atoms/Box';
import { RightCircleOutlined } from '@ant-design/icons';
import { Layout } from './Layout';

const { Header, Content, Footer, Sider } = Layout;

export default {
  component: Layout,
  title: 'Layout',
  excludeStories: /.*Data$/,
};

export const Structer = () => (
  <Box>
    <Box>
      <Layout style={{ textAlign: 'center' }}>
        <Header style={{ background: '#7dbceb' }}>Header</Header>
        <Content pt={50} height={120} style={{ textAlign: 'center', background: '#108ee9' }}>
          Content
        </Content>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
    <Box mt={30}>
      <Layout style={{ textAlign: 'center' }}>
        <Header height={60} style={{ background: '#7dbceb' }}>
          Header
        </Header>
        <Layout>
          <Sider pt={50} style={{ textAlign: 'center', background: '#3ba0e9' }}>
            Sider
          </Sider>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
    <Box mt={30}>
      <Layout style={{ textAlign: 'center' }}>
        <Header style={{ background: '#7dbceb' }}>Header</Header>
        <Layout>
          <Content pt={50} height={120} style={{ textAlign: 'center', background: '#108ee9' }}>
            Content
          </Content>
          <Sider pt={50} style={{ textAlign: 'center', background: '#3ba0e9' }}>
            Sider
          </Sider>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
    <Box mt={30}>
      <Layout style={{ textAlign: 'center' }}>
        <Sider pt={100} style={{ textAlign: 'center', background: '#3ba0e9' }}>
          Sider
        </Sider>
        <Layout>
          <Header style={{ background: '#7dbceb' }}>Header</Header>
          <Content pt={50} height={120} style={{ textAlign: 'center', background: '#108ee9' }}>
            Content
          </Content>
          <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
        </Layout>
      </Layout>
    </Box>
  </Box>
);

export const LayoutHasSider = () => (
  <Box>
    <Box style={{ textAlignLast: 'left' }}>
      <h1>true</h1>
    </Box>
    <Box mt={30}>
      <Layout hasSider style={{ textAlign: 'center' }}>
        <Header height={60} style={{ background: '#7dbceb' }}>
          Header
        </Header>
        <Layout>
          <Sider pt={50} style={{ textAlign: 'center', background: '#3ba0e9' }}>
            Sider
          </Sider>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
  </Box>
);

export const SiderBreakpoint = () => (
  <Box>
    <Box mt={10} mb={10}>
      <Box mb={10} style={{ textAlignLast: 'left' }}>
        <h1>XS </h1>
        <h2>{'<'} 576px</h2>
      </Box>
      <Layout style={{ textAlign: 'center' }}>
        <Header height={60} style={{ background: '#7dbceb' }}>
          Header
        </Header>
        <Layout>
          <Sider breakpoint="xs" pt={40} style={{ textAlign: 'center', background: '#3ba0e9' }}>
            Sider
          </Sider>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
    <Box mt={40} mb={20}>
      <Box mb={10} style={{ textAlignLast: 'left' }}>
        <h1>SM </h1>
        <h2>≥ 576px</h2>
      </Box>
      <Layout style={{ textAlign: 'center' }}>
        <Header height={60} style={{ background: '#7dbceb' }}>
          Header
        </Header>
        <Layout>
          <Sider breakpoint="sm" pt={40} style={{ textAlign: 'center', background: '#3ba0e9' }}>
            Sider
          </Sider>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
    <Box mt={30}>
      <Box mb={10} style={{ textAlignLast: 'left' }}>
        <h1>MD </h1>
        <h2>≥ 768px</h2>
      </Box>
      <Layout style={{ textAlign: 'center' }}>
        <Header height={60} style={{ background: '#7dbceb' }}>
          Header
        </Header>
        <Layout>
          <Sider breakpoint="md" pt={40} style={{ textAlign: 'center', background: '#3ba0e9' }}>
            Sider
          </Sider>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
    <Box mt={30}>
      <Box mb={10} style={{ textAlignLast: 'left' }}>
        <h1>LG </h1>
        <h2>≥ 992px</h2>
      </Box>
      <Layout style={{ textAlign: 'center' }}>
        <Header height={60} style={{ background: '#7dbceb' }}>
          Header
        </Header>
        <Layout>
          <Sider breakpoint="lg" pt={40} style={{ textAlign: 'center', background: '#3ba0e9' }}>
            Sider
          </Sider>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
    <Box mt={30}>
      <Box mb={10} style={{ textAlignLast: 'left' }}>
        <h1>XL </h1>
        <h2>≥ 1200px</h2>
      </Box>
      <Layout style={{ textAlign: 'center' }}>
        <Header height={60} style={{ background: '#7dbceb' }}>
          Header
        </Header>
        <Layout>
          <Sider breakpoint="xl" pt={40} style={{ textAlign: 'center', background: '#3ba0e9' }}>
            Sider
          </Sider>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
    <Box mt={30}>
      <Box mb={10} style={{ textAlignLast: 'left' }}>
        <h1>XXL </h1>
        <h2>≥ 1600px</h2>
      </Box>
      <Layout style={{ textAlign: 'center' }}>
        <Header height={60} style={{ background: '#7dbceb' }}>
          Header
        </Header>
        <Layout>
          <Sider breakpoint="xxl" pt={40} style={{ textAlign: 'center', background: '#3ba0e9' }}>
            Sider
          </Sider>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
  </Box>
);

export const SiderColapsed = () => (
  <Box>
    <Box>
      <Box style={{ textAlignLast: 'left' }}>
        <h1> true</h1>
      </Box>
      <Box mt={30}>
        <Layout style={{ textAlign: 'center' }}>
          <Header height={60} style={{ background: '#7dbceb' }}>
            Header
          </Header>
          <Layout>
            <Sider collapsed pt={50} style={{ textAlign: 'center', background: '#3ba0e9' }}>
              Sider
            </Sider>
            <Content pt={50} height={120} style={{ background: '#108ee9' }}>
              Content
            </Content>
          </Layout>
          <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
        </Layout>
      </Box>
    </Box>
    <Box>
      <Box mt={30} style={{ textAlignLast: 'left' }}>
        <h1> false</h1>
      </Box>
      <Box mt={30}>
        <Layout style={{ textAlign: 'center' }}>
          <Header height={60} style={{ background: '#7dbceb' }}>
            Header
          </Header>
          <Layout>
            <Sider collapsed={false} pt={50} style={{ textAlign: 'center', background: '#3ba0e9' }}>
              Sider
            </Sider>
            <Content pt={50} height={120} style={{ background: '#108ee9' }}>
              Content
            </Content>
          </Layout>
          <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
        </Layout>
      </Box>
    </Box>
  </Box>
);

export const SiderCollapsible = () => (
  <Box>
    <Box style={{ textAlignLast: 'left' }}>
      <h1> true</h1>
    </Box>
    <Box mt={30}>
      <Layout style={{ textAlign: 'center' }}>
        <Header height={60} style={{ background: '#7dbceb' }}>
          Header
        </Header>
        <Layout>
          <Sider collapsible pt={50} style={{ textAlign: 'center', background: '#3ba0e9' }}>
            Sider
          </Sider>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
  </Box>
);

export const SiderDefaultCollapsed = () => (
  <Box>
    <Box style={{ textAlignLast: 'left' }}>
      <h1> true</h1>
    </Box>
    <Box mt={30}>
      <Layout style={{ textAlign: 'center' }}>
        <Header height={60} style={{ background: '#7dbceb' }}>
          Header
        </Header>
        <Layout>
          <Sider defaultCollapsed collapsible pt={50} style={{ textAlign: 'center', background: '#3ba0e9' }}>
            Sider
          </Sider>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
  </Box>
);

export const SiderCollapsedWidth = () => (
  <Box>
    <Box mt={30}>
      <Box mb={10} style={{ textAlignLast: 'left' }}>
        <h1> 50px</h1>
      </Box>
      <Layout style={{ textAlign: 'center' }}>
        <Header height={60} style={{ background: '#7dbceb' }}>
          Header
        </Header>
        <Layout>
          <Sider defaultCollapsed collapsedWidth={50} pt={50} style={{ textAlign: 'center', background: '#3ba0e9' }}>
            Sider
          </Sider>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
    <Box mt={30}>
      <Box mb={10} style={{ textAlignLast: 'left' }}>
        <h1> 100px</h1>
      </Box>
      <Layout style={{ textAlign: 'center' }}>
        <Header height={60} style={{ background: '#7dbceb' }}>
          Header
        </Header>
        <Layout>
          <Sider defaultCollapsed collapsedWidth={100} pt={50} style={{ textAlign: 'center', background: '#3ba0e9' }}>
            Sider
          </Sider>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
    <Box mt={30}>
      <Box mb={10} style={{ textAlignLast: 'left' }}>
        <h1> 150px</h1>
      </Box>
      <Layout style={{ textAlign: 'center' }}>
        <Header height={60} style={{ background: '#7dbceb' }}>
          Header
        </Header>
        <Layout>
          <Sider defaultCollapsed collapsedWidth={150} pt={50} style={{ textAlign: 'center', background: '#3ba0e9' }}>
            Sider
          </Sider>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
  </Box>
);

export const SiderTrigger = () => (
  <Box>
    <Box style={{ textAlignLast: 'left' }}>
      <h1> Icon for trigger </h1>
    </Box>
    <Box mt={30}>
      <Layout style={{ textAlign: 'center' }}>
        <Header height={60} style={{ background: '#7dbceb' }}>
          Header
        </Header>
        <Layout>
          <Sider
            trigger={<RightCircleOutlined />}
            defaultCollapsed
            collapsible
            pt={50}
            style={{ textAlign: 'center', background: '#3ba0e9' }}
          >
            Sider
          </Sider>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
        </Layout>
        <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
      </Layout>
    </Box>
  </Box>
);

export const SiderZeroWidthTriggerStyle = () => (
  <Box>
    <Box mt={30}>
      <h1> default </h1>
      <Layout mt={10} style={{ textAlign: 'center' }}>
        <Sider
          collapsedWidth={0}
          zeroWidthTriggerStyle={{}}
          defaultCollapsed
          collapsible
          pt={50}
          style={{ textAlign: 'center', background: '#3ba0e9' }}
        >
          Sider
        </Sider>
        <Layout>
          <Header height={60} style={{ background: '#7dbceb' }}>
            Header
          </Header>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
          <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
        </Layout>
      </Layout>
    </Box>
    <Box mt={30}>
      <h1> top: 0 </h1>
      <Layout mt={10} style={{ textAlign: 'center' }}>
        <Sider
          collapsedWidth={0}
          zeroWidthTriggerStyle={{ top: '0' }}
          defaultCollapsed
          collapsible
          pt={50}
          style={{ textAlign: 'center', background: '#3ba0e9' }}
        >
          Sider
        </Sider>
        <Layout>
          <Header height={60} style={{ background: '#7dbceb' }}>
            Header
          </Header>
          <Content pt={50} height={120} style={{ background: '#108ee9' }}>
            Content
          </Content>
          <Footer style={{ background: '#7dbceb' }}>Footer</Footer>
        </Layout>
      </Layout>
    </Box>
  </Box>
);
