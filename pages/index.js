import React from 'react';
import FeaturedImages from '../components/homepage/FeaturedImages';
import Banner from '../components/homepage/Banner';
import home from '../data/homepage.json';
import Layout from '../components/Layout';
import HorizontalInfoBar from '../components/homepage/HorizontalInfoBar';

const Index = () => (
  <Layout>
    <Banner
      src={home.banner.src}
      title={home.banner.title}
      subtitle={home.banner.subtitle}
      spot={home.banner.spot}
    />
    <HorizontalInfoBar title={home.about.title} body={home.about.body} />
    <FeaturedImages
      title={home.featuredSpeakers.title}
      featured={home.featuredSpeakers.featured}
    />
  </Layout>
);

export default Index;
