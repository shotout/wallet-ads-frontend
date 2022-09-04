import { Container, Grid, Typography } from '@mui/material';
// layouts
import Layout from '../../layouts';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function ComingSoon() {
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
