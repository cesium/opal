import { styled } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const Wrapper = styled(Grid)({
    paddingTop: '1em',
    paddingBottom: '1em',
    position: 'relative',
    overflow: 'hidden',
});

const Body = styled(Grid)({
    position: 'absolute',
    paddingTop: '5%',
    paddingLeft: '5%',
    maxWidth: '60%',
    overflow: 'hidden',
});

const StyledText = styled(Typography)({
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: '1.1em',
    textShadow: '0.08em 0.08em black',
    paddingBottom: '0.1em',
    overflow: 'hidden'
});

const Text = ({ src, variant }) => (
    <Grid item>
        <StyledText variant={variant}>
            {src}
        </StyledText>
    </Grid>
);

function Banner(props) {
    return (
            <Wrapper container direction="column">
                <img src={props.src} width="100%"/>
                <Body container direction="column" justify="center" alignItems="flex-start">
                    <Text src={props.title} variant="h2" />
                    <Text src={props.subtitle} variant="h6" />
                </Body>
            </Wrapper>
    );
}

Banner.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string
}

export default Banner;
