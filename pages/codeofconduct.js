import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Layout from '../components/Layout';
import TopSection from '../components/TopSection';
import Document from '../components/Document';
import theme from '../components/theme';

const Title = styled(Typography)({
  textAlign: 'center',
  overflow: 'hidden',
  textTransform: 'uppercase',
  padding: theme.spacing(3),
});

const Text = styled(Typography)({
  margin: 0,
  padding: theme.spacing(3),
  textAlign: 'justify',
  overflow: 'hidden',
});

const CodeOfConduct = () => (
  <Layout>
    <TopSection
      text="Code of Conduct"
      color={theme.palette.primary.main}
      title
      pageTitle
    />
    <Document>
      <Text>
        This set of rules must be followed throughout the entire event, both at
        the conference and other conference-related social events.
      </Text>

      <Title variant="h4">FOR ALL PARTICIPANTS</Title>

      <Text>
        We do not tolerate harassment of conference participants in any form.
        Sexual language and imagery are not appropriate for any conference
        venue, including talks and workshops. Conference participants violating
        these rules may be expelled from the conference. Harassment includes
        offensive verbal comments related to gender, sexual orientation,
        disability, physical appearance, body size, race, religion, sexual
        images in public spaces, deliberate intimidation, stalking, following,
        harassing photography or recording, sustained disruption of talks or
        other events, inappropriate physical contact, and unwelcome sexual
        attention. Participants asked to stop any harassing behaviour are
        expected to comply immediately.
      </Text>

      <Title variant="h4">SPONSORS, EXHIBITORS AND SPEAKERS</Title>

      <Text>
        Exhibitors in the sponsor booths and speakers or similar activities are
        also subject to the anti-harassment policy. In particular, exhibitors
        and speakers should not use sexualized images, activities, or other
        material. Booth staff (including volunteers) should not use sexualized
        clothing/uniforms/costumes or otherwise create a sexualized environment.
        If a participant engages in harassing behaviour, the conference
        organisers may take any action they deem appropriate, including warning
        the offender or expulsion from the conference with no refund. If you are
        being harassed, notice that someone else is being harassed, or have any
        other concerns, please contact a member of conference staff immediately.
        Conference staff can be identified by their t-shirts.
      </Text>
    </Document>
  </Layout>
);

export default CodeOfConduct;
