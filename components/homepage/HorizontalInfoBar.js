import { styled } from '@material-ui/core/styles';
import { Divider, Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const Wrapper = styled(Grid)({
    paddingLeft: '2em',
    paddingRight: '2em',
    paddingTop: '1em',
    paddingBottom: '1em',
    direction: 'row',
    justify: 'space-between',
    alignItems: 'flex-start',
});

const TitleBox = styled(Grid)({
    paddingRight: '1em',
});

const Title = styled(Typography)({
    textAlign: 'center',
    textTransform: 'uppercase',
});

const BodyBox = styled(Grid)({
    paddingLeft: '1em',
});

const Body = styled(Typography)({
    textAlign: 'left',
});

function HorizontalInfoBar(props) {

    return (
        <Wrapper container>
            <TitleBox xs="3">
                <Title variant="h5">
                    {props.title}
                </Title>
            </TitleBox>
            <BodyBox xs="9">
                {props.body.map((line, i) =>
                    <Body key={i} variant="body1">
                        {line}
                    </Body>
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
