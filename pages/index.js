import React from 'react';
import Banner from '../components/homepage/Banner';
import Layout from '../components/Layout';
import About from '../components/homepage/About';
import Pricing from '../components/homepage/Pricing';
import TopSection from '../components/TopSection';
import home from '../data/homepage.json';
import global from '../data/global.json';
import theme from '../static/theme';
import Countdown from '../components/homepage/Countdown';
import Sponsors from '../components/homepage/sponsors/Sponsors';
import sponsors from '../data/sponsors';

const Index = () => (
  <Layout>
    <Banner
      background={home.banner.background}
      logo={global.event.logo}
      date={home.banner.date}
      location={home.banner.location}
    />
    <TopSection
      text="faltam"
      color={theme.palette.secondary.light}
      title
      contentUnderneath
    >
      <Countdown date={home.timer.starting} />
    </TopSection>
    <Sponsors
      type="exclusive"
      data={sponsors.exclusive}
      color={theme.palette.secondary.main}
      backgroundImage="/static/img/random_bubbles_lines.svg"
      // color="#EEEBD3"
      // color="#fffdf0"
      // color="#dedede"
    />
    <About url={home.about.teaserURL} />
    <Pricing tiers={home.ticketInfo} />
    <Sponsors
      type="gold"
      data={sponsors.gold}
      color={theme.palette.secondary.main}
      backgroundImage="/static/img/bubbles.png"
    />
    <Sponsors
      type="silver"
      data={sponsors.silver}
      color={theme.palette.secondary.light}
      backgroundImage="/static/img/random_bubbles_lines.svg"
    />
    <Sponsors
      type="bronze"
      data={sponsors.bronze}
      color={theme.palette.secondary.main}
      backgroundImage="/static/img/bubbles.png"
    />
    {/* <FeaturedImages
      title={home.featuredSpeakers.title}
      featured={home.featuredSpeakers.featured}
    /> */}
  </Layout>
);

export default Index;
