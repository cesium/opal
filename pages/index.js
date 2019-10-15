import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FeaturedImages from '../components/homepage/FeaturedImages';
import home from '../static/homepage.json'
import Layout from '../components/Layout';
import HorizontalInfoBar from '../components/homepage/HorizontalInfoBar';

const Index = () => (
    <Layout>
        <HorizontalInfoBar title={home.about.title} body={home.about.body}/>
        <FeaturedImages title={home.featuredSpeakers.title} featured={home.featuredSpeakers.featured}/>
    </Layout>
  );

export default Index;
