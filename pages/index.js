import Layout from '../components/Layout';
import Banner from '../components/homepage/Banner';
import home from '../static/homepage.json';

const Index = () => (
  <Layout>
    <Banner src={home.banner.src} title={home.banner.title} subtitle={home.banner.subtitle} />
  </Layout>
  );

export default Index;
