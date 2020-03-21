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

const CodeOfConduct = () => (
  <Layout>
    <TopSection
      text="Candidaturas"
      color={theme.palette.primary.main}
      title
      pageTitle
    />
    <Document>
      <Title variant="h2">
        <span role="img" aria-label="Atenção">
          ⚠️
        </span>
        ATENÇÃO
        <span role="img" aria-label="Atenção">
          ⚠
        </span>
      </Title>

      <Title variant="h4">
        A data de entrega de candidaturas está adiada por tempo indeterminado
        devido ao estado de emergência nacional causado pela pandemia COVID-19.
      </Title>

      <Text variant="h5">
        A todos os interessados, entrem em contacto através do email
        geral@enei.pt.
      </Text>

      <Title variant="h4">Considerações Gerais</Title>

      <Text>
        As candidaturas à organização do Encontro Nacional de Estudantes de
        Informática 2021 estão abertas
        <span style={{ textDecoration: 'line-through' }}>
          até dia 15 de março de 2020
        </span>
        . Depois desta data não serão aceites mais candidaturas à organização do
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

      <Text>
        <span>Para saber mais consulta o nosso artigo </span>
        <Link href="https://link.medium.com/UERn2osbW3">
          <Hack>aqui</Hack>
        </Link>
        <span>.</span>
      </Text>

      <Grid container justify="center">
        <Attachment
          text="Ver Regulamento"
          url="/docs/regulamento-enei-2021.pdf"
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

export default CodeOfConduct;
