
export const button = ({ icon }) => ({
  justifyContent: icon ? undefined : 'center'
});

export const label = ({ large, small, labelStyle }) => {
  return {
    fontSize: small ? 14 : large ? 32 : 22,
    lineHeight: small ? 22 : large ? 39 : 28,
    fontFamily: 'BebasNeue',
    ...labelStyle
  };
};

export const icon = ({ large, small, iconStyle }) => {
  return { fontSize: small ? 12 : large ? 30 : 20, ...iconStyle };
};
