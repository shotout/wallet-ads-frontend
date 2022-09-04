import { Container, Typography, Grid } from '@mui/material';
// layouts
import Layout from '../../layouts';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

PageOne.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Coming Soon">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container justifyContent={"center"} alignContent="center" height={"100vh"}>
          <Typography variant="h3" component="h1" paragraph>
            Page Under Construction
          </Typography>
        </Grid>
      </Container>
    </Page>
  );
}
