import React from 'react';
import Banner from '../components/homepage/Banner';
import Layout from '../components/Layout';
import Pricing from '../components/homepage/Pricing';
import TextAbout from '../components/homepage/TextAbout';
import TopSection from '../components/TopSection';
import home from '../data/homepage.json';
import global from '../data/global.json';
import theme from '../components/theme';
import Countdown from '../components/homepage/Countdown';
import FeaturedSpeakers from '../components/homepage/FeaturedSpeakers';
import Sponsors from '../components/homepage/sponsors/Sponsors';
import sponsors from '../data/sponsors.json';
import speakers from '../data/speakers.json';

export default function Index() {
  const featuredSpeakers = [];

  speakers.forEach((speaker) => {
    if (speaker.featured) featuredSpeakers.push(speaker);
  });

  return (
    <Layout>
      <Banner
        background={home.banner.background}
        logo={global.event.logo}
        date={home.banner.date}
        location={home.banner.location}
      />
      <TopSection
        text="faltam"
        color={theme.palette.secondary.main}
        title
        contentUnderneath
      >
        <Countdown date={home.timer.starting} />
      </TopSection>
      <TextAbout messages={home.about.messages} />
      <Sponsors
        type="exclusive"
        data={sponsors.exclusive}
        color={theme.palette.secondary.main}
        backgroundImage="/img/random_bubbles_lines.svg"
        // color="#EEEBD3"
        // color="#fffdf0"
        // color="#dedede"
      />
      <Pricing tiers={home.ticketInfo} />
      <Sponsors
        type="gold"
        data={sponsors.gold}
        color={theme.palette.secondary.main}
        backgroundImage="/img/bubbles.png"
      />
      <FeaturedSpeakers
        title="Oradores"
        featured={featuredSpeakers}
        color={theme.palette.secondary.light}
        backgroundImage="/img/bubbles.png"
      />
      <Sponsors
        type="silver"
        data={sponsors.silver}
        color={theme.palette.secondary.main}
        backgroundImage="/img/random_bubbles_lines.svg"
      />
      <Sponsors
        type="bronze"
        data={sponsors.bronze}
        color={theme.palette.secondary.light}
        backgroundImage="/img/bubbles.png"
      />
    </Layout>
  );
}
