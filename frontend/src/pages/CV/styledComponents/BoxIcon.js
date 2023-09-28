import styled from 'styled-components';

export const BoxIconStyled = styled.span`
    font-size: 20px;
    display: flex;
    margin: auto 8px auto 0;
    padding: 2px;
    border-radius: 4px;
    color: white;
    background-color: ${(props) => props.theme.color};
`;
