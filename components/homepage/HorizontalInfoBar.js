import { styled } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const Wrapper = styled(Box)({
    width: '100%',
    paddingLeft: '2em',
    paddingRight: '2em',
    paddingTop: '1em',
    paddingBottom: '1em',
    justifyContent: 'flex-start',
    display: 'flex',
});

const TitleBox = styled(Box)({
    width: '25%',
    paddingRight: '1em',
});

const Title = styled(Typography)({
    textAlign: 'center',
    textTransform: 'uppercase',
});

const BodyBox = styled(Box)({
    width: '75%',
})

function HorizontalInfoBar(props) {

    return (
        <Wrapper>
            <TitleBox>
                <Title variant="h5">
                    {props.title}
                </Title>
            </TitleBox>
            <BodyBox>
                {props.body.map((line, i) =>
                    <Typography key={i} variant="body1" align="left">
                        {line}
                    </Typography>
                )}
            </BodyBox>
        </Wrapper>
    );
}

HorizontalInfoBar.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.array.isRequired,
};

export default HorizontalInfoBar;
