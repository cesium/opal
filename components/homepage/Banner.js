import { styled } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const Wrapper = styled(Box)({
    paddingTop: '1em',
    paddingBottom: '1em',
    position: 'relative',
});

const Image = ({ src }) => (
    <Box>
        <img src={src} width="100%"/>
    </Box>
);

const StyledTitle = styled(Typography)({
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    maxWidth: '50%',
    lineHeight: '1.2em',
    position: 'relative',
});

const Body = styled(Box)({
    position: 'absolute',
    top: '2em',
    left: '2em',
})

const StyledSubTitle = styled(StyledTitle)({
    position: 'relative',
    paddingTop: '1em',
});

function Banner(props) {
    return (
            <Wrapper>
                <Image src={props.src}/>
                <Body>
                    <StyledTitle variant="h2">
                        {props.title}
                    </StyledTitle>
                    <StyledSubTitle variant="h6">
                        {props.subtitle}
                    </StyledSubTitle>
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
