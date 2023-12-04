import styled from 'styled-components';

export const TitleLarge = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: ${(props) => props.theme.color};
`;

export const Title = styled.h3`
    font-size: 14px;
    font-weight: 700;
    color: ${(props) => props.theme.color};
`;

export const SubTitle = styled.h4`
    font-size: 12px;
    font-weight: 600;
    color: #555555;
`;
