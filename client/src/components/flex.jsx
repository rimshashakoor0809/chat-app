const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

export const FlexCenter = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const FlexStart = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
});

export const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const FlexRow = styled(Box)({
  display: "flex",
  flexDirection: 'row',
});
export const FlexColumn = styled(Box)({
  display: "flex",
  flexDirection: 'column',
  
});
export const FlexTextColumn = styled(Box)({
  display: "flex",
  flexDirection: 'column',
});