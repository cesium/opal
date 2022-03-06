import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import Link from '../components/Link';
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
  color: theme.palette.text.body,
  padding: theme.spacing(1),
  textAlign: 'justify',
  overflow: 'hidden',
});

const Item = styled(Grid)({
  margin: theme.spacing(1),
});

const Hack = styled(`span`)({
  color: theme.palette.text.body,
});

const Attachment = ({ text, url }) => (
  <Item item>
    <Link href={url}>
      <Button variant="contained" color="secondary">
        {text}
      </Button>
    </Link>
  </Item>
);

const Applications = () => (
  <Layout>
    <TopSection
      text="Candidaturas"
      color={theme.palette.primary.main}
      title
      pageTitle
    />
    <Document>
      <Title variant="h4">Considerações Gerais</Title>

      <Text>
        As candidaturas à organização da 15.ª edição Encontro Nacional de
        Estudantes de Informática estão abertas até dia 10 de abril de 2022.
        Depois desta data não serão aceites mais candidaturas à organização do
        evento.
      </Text>

      <Text>
        Estão elegíveis a apresentar candidaturas todos os Organismos Estudantis
        (núcleos, associações, etc.) que representem estudantes de informática
        do Ensino Superior (Universidades e Politécnicos), não podendo ser
        apresentadas a título pessoal.
      </Text>

      <Text>
        Preenche o formulário de pré-candidatura para que te possamos contactar
        durante o período de candidatura e, depois, durante a fase de avaliação
        das candidaturas.
      </Text>

      <Grid container justify="center">
        <Attachment
          text="Ver Regulamento"
          url="/docs/regulamento-candidaturas.pdf"
        />
        <Attachment
          text="Formulário de Pré-Candidatura"
          url="https://forms.gle/hJF1LcmTzXXVAUaa9"
        />
      </Grid>
    </Document>
  </Layout>
);

Attachment.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Applications;
