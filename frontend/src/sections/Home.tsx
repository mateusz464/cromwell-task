import { Grid, Typography, Button, Box } from "@mui/material";

function Home() {
  return (
    <Grid container spacing={2} style={{ marginTop: "30px" }}>
      <Grid
        item
        xs={12}
        sm={6}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2" gutterBottom style={{ padding: "10px" }}>
          Welcome to Cromwell!
        </Typography>
        <Typography variant="h5" gutterBottom style={{ padding: "10px" }}>
          Cromwell has grown from humble beginnings over 50 years ago to become
          a trusted source of MRO supplies and industrial products.
        </Typography>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px", marginTop: "20px" }}
            href={"https://www.cromwell.co.uk/info/about"}
            target={"_blank"}
          >
            Find Out More!
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: { xs: "none", md: "block" } }}>
        <img
          src="/cromwell-office.webp"
          alt="Placeholder image"
          style={{ width: "100%", height: "auto" }}
        />
      </Grid>
    </Grid>
  );
}

export default Home;
