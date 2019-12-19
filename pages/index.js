import React from 'react';
import FeaturedImages from '../components/homepage/FeaturedImages';
import Banner from '../components/homepage/Banner';
import Layout from '../components/Layout';
import About from '../components/homepage/About';
import Pricing from '../components/homepage/Pricing';
import TopSection from '../components/TopSection';
import home from '../data/homepage.json';
import global from '../data/global.json';
import theme from '../static/theme';
import Countdown from '../components/homepage/Countdown';

const Index = () => (
  <Layout>
    <Banner
      background={home.banner.background}
      logo={global.event.logo}
      date={home.banner.date}
      location={home.banner.location}
    />
    <TopSection text="faltam" color={theme.palette.secondary.light} title>
      <Countdown date={home.timer.starting} />
    </TopSection>
    <About url={home.about.teaserURL} />
    <Pricing tiers={home.ticketInfo} />
    {/* <FeaturedImages
      title={home.featuredSpeakers.title}
      featured={home.featuredSpeakers.featured}
    /> */}
  </Layout>
);

export default Index;
