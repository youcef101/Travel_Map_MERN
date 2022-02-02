import { css } from 'styled-components'
export const mobileMini = (props) => {
    return css`
    @media only screen and (max-width: 376px){
        ${props}
    }
    `;
}

export const mobile = (props) => {
    return css`
    @media only screen and (max-width: 420px){
        ${props}
    }
    `
}

export const mobileMax = (props) => {
    return css`
    @media only screen and (max-width: 570px){
        ${props}
    }
    `
}


export const MediumMin = (props) => {
    return css`
     @media only screen and (max-width: 600px){
        ${props}
    }
    `
}
export const Medium = (props) => {
    return css`
     @media only screen and (max-width: 643px){
        ${props}
    }
    `
}

export const MediumMax = (props) => {
    return css`
     @media only screen and (max-width: 683px){
        ${props}
    }
    `
}
export const IpadMini = (props) => {
    return css`
     @media only screen and (max-width: 790px){
        ${props}
    }
    `
}

export const Ipad = (props) => {
    return css`
     @media only screen and (max-width: 820px){
        ${props}
    }
    `
}

export const IpadMax = (props) => {
    return css`
     @media only screen and (max-width: 993px){
        ${props}
    }
    `
}

export const Surface = (props) => {
    return css`
     @media only screen and (max-width: 1200px){
        ${props}
    }
    `
}
