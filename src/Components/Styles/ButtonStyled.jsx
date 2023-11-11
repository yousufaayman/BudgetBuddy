import {styled} from 'styled-components'
import { device } from 
"./devices"

export const ButtonStyled = styled.button`
    margin: ${(props) => props.margin};
    grid-area: ${(props) => props.gridarea};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    align-items: center;
    appearance: none;
    background-image: radial-gradient(100% 100% at 100% 0, ${(props) => props.bgcolor1} 0, ${(props) => props.bgcolor2} 100%);
    border: 0;
    border-radius: 6px;
    box-shadow: rgba(125, 46, 104, 0.746) 0 2px 4px,rgba(125, 46, 104, 0.746) 0 7px 13px -3px,rgba(125, 46, 104, 0.746) 0 -3px 0 inset;
    box-sizing: border-box;
    color: ${(props) => props.color};
    cursor: pointer;
    display: inline-flex;
    font-family: 'Roboto Mono';
    font-size: ${(props) => props.fsize};
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s,transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow,transform;
    &:focus {
    box-shadow: #7D2E68 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #8e3ce0 0 -3px 0 inset;
    }

    &:hover {
    box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #7D2E68 0 -3px 0 inset;
    transform: translateY(-2px);
    }

    &:active {
    box-shadow: #7D2E68 0 3px 7px inset;
    transform: translateY(2px);
    }
    @media ${device.laptop} { 
        margin-top: ${(props) => props.qmargin};
        width: ${(props) => props.qwidth};
        height: ${(props) => props.qheight};
        grid-area: ${(props) => props.qgridarea};
  }
`