import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Layout from '../components/Layout';
import HorizontalInfoBar from '../components/homepage/HorizontalInfoBar';
import home from '../static/homepage.json'

const Index = () => (
    <Layout>
        <HorizontalInfoBar title={home.about.title} body={home.about.body}/>
    </Layout>
  );

export default Index;
