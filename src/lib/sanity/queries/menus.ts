import { groq } from 'next-sanity';

export const headerMenuQuery = groq`
  *[_type == "headerMenu" && _id == "headerMenu"][0] {
    menuItems[] {
      title,
      link,
    },
    headerSettings {
      linkName,
      linkUrl,
      buttonName,
      buttonUrl
    }
  }
`;

export const footerMenuQuery = groq`
  *[_type == "footerMenu" && _id == "footerMenu"][0] {
    links[] {
      title,
      link
    },
    social[] {
      title,
      icon,
      link
    }
  }
`;
