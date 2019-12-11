import React from 'react';
import FeaturedImages from '../components/homepage/FeaturedImages';
import Banner from '../components/homepage/Banner';
import home from '../data/homepage.json';
import Layout from '../components/Layout';
import HorizontalInfoBar from '../components/homepage/HorizontalInfoBar';
import Pricing from '../components/homepage/Pricing';

const Index = () => (
  <Layout>
    <Banner
      src={home.banner.src}
      title={home.banner.title}
      subtitle={home.banner.subtitle}
    />
    <FeaturedImages
      title={home.featuredSpeakers.title}
      featured={home.featuredSpeakers.featured}
    />
    <HorizontalInfoBar
      title={home.about.title}
      body={home.about.body}
      url={home.about.teaserURL}
    />
    <Pricing tiers={home.ticketInfo} />
  </Layout>
);

export default Index;
