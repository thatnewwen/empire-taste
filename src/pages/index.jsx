import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { graphql } from "gatsby";
import { Layout, Listing, Wrapper, Title } from "../components";
import website from "../../config/website";
import heroVideo from "../components/hero.mp4";
import logo from "../components/ET-logo.png";
import yellowLogo from "../components/ET-logo-yellow.png";
import { Helmet } from 'react-helmet'

const Hero = styled.header`
  background-color: ${(props) => props.theme.colors.yellow};
  display: flex;
  align-items: center;
  height: 100vh;
`;

const HeroInner = styled(Wrapper)`
  /* padding-top: 13rem;
  padding-bottom: 13rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  h1 {
    margin-bottom: 2rem;
  }
  video {
    border-radius: 5px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    /* padding-top: 10rem;
    padding-bottom: 10rem; */
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    /* padding-top: 8rem;
    padding-bottom: 8rem; */

  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    video{
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vh;
      object-fit: cover;
    }
    /* padding-top: 6rem;
    padding-bottom: 6rem; */
  }
`;

const HeroText = styled.div`
  font-size: 0.7rem;
  line-height: 1.4;
  margin: 2rem 0;
  max-width: 600px;
  z-index: 10;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    color: ${(props) => props.theme.colors.yellow};
    font-size: 1rem;
    margin: 2rem;
  }
`;

const Social = styled.ul`
  list-style-type: none;
  display: flex;
  position: absolute;
  flex-direction: row;
  left: 30px;
  /* flex-direction: column; */
  flex-wrap: wrap;
  margin-left: 0;
  font-family: "Source Sans Pro", -apple-system, "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    left: 0;
    right: 0;
    justify-content: center;

    .stdLogo{
      display: none;
    }
  }
  img {
    width: 70px;
  }
  li {
    display: flex;
    align-items: center;
    margin-left: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0rem;
    &:not([data-name="social-entry-0"]) {
      @media (max-width: ${(props) => props.theme.breakpoints.s}) {
        margin-left: 1.75rem;
      }
    }
    a {
      font-style: normal;
      text-transform: uppercase;
      color: ${(props) => props.theme.colors.greyDark};
      font-size: 0.7rem;
      font-weight: 600;
      &:hover,
      &:focus {
        color: ${(props) => props.theme.colors.primary};
        text-decoration: none;
      }
      @media (max-width: ${(props) => props.theme.breakpoints.s}) {
        font-size: 0.7rem;
        color: ${(props) => props.theme.colors.yellow};
      }
    }
  }
`;

const ProjectListing = styled.ul`
  list-style-type: none;
  margin-left: 0;
  margin-top: 4rem;
  li {
    margin-bottom: 1.45rem;
    a {
      font-size: 2.369rem;
      font-style: normal;
      color: ${(props) => props.theme.colors.black};
      @media (max-width: ${(props) => props.theme.breakpoints.s}) {
        font-size: 1.777rem;
      }
    }
  }
`;

const IndexWrapper = Wrapper.withComponent("main");

class Index extends Component {
  render() {
    const {
      data: { homepage, social, posts, projects },
    } = this.props;
    return (
      <Layout>
        <Helmet>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        </Helmet>
        <Hero>
          <HeroInner>
            <video width="600" autoPlay muted loop>
              <source src={heroVideo} type="video/mp4"></source>
              Your browser does not support the video tag.
            </video>
            <HeroText
              dangerouslySetInnerHTML={{ __html: homepage.data.content.html }}
            />
            <div className="headerSection">
              <Social>
                <img src={yellowLogo} />
                <img className="stdLogo" src={logo} />
                {social.nodes.map((s, index) => (
                  <li
                    data-name={`social-entry-${index}`}
                    key={s.primary.label.text}
                  >
                    <a href={s.primary.link.url}>{s.primary.label.text}</a>
                  </li>
                ))}
              </Social>
            </div>
          </HeroInner>
        </Hero>
        {/* <IndexWrapper
          id={website.skipNavId}
          style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        >
          <Title style={{ marginTop: "4rem" }}>Recent posts</Title>
          <Listing posts={posts.nodes} />
          <Title style={{ marginTop: "8rem" }}>Recent projects</Title>
          <ProjectListing>
            {projects.nodes.map((project) => (
              <li key={project.primary.label.text}>
                <a href={project.primary.link.url}>
                  {project.primary.label.text}
                </a>
              </li>
            ))}
          </ProjectListing>
        </IndexWrapper> */}
      </Layout>
    );
  }
}

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    homepage: PropTypes.shape({
      data: PropTypes.shape({
        title: PropTypes.shape({
          text: PropTypes.string.isRequired,
        }),
        content: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }),
      }),
    }),
    social: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
    posts: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
    projects: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    homepage: prismicHomepage {
      data {
        title {
          text
        }
        content {
          html
        }
      }
    }
    social: allPrismicHeroLinksBodyLinkItem {
      nodes {
        primary {
          label {
            text
          }
          link {
            url
          }
        }
      }
    }
    posts: allPrismicPost(sort: { fields: [data___date], order: DESC }) {
      nodes {
        uid
        data {
          title {
            text
          }
          date(formatString: "DD.MM.YYYY")
          categories {
            category {
              document {
                data {
                  name
                }
              }
            }
          }
        }
      }
    }
    projects: allPrismicProjectsBodyLinkItem {
      nodes {
        primary {
          label {
            text
          }
          link {
            url
          }
        }
      }
    }
  }
`;
