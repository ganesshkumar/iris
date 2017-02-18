import React from 'react'
import Paper from 'material-ui/Paper'
import Colors from 'material-ui/styles/colors'

const links = [
  {
    title: 'HNews',
    text: '',
    url: 'https://news.ycombinator.com/news'
  },
  {
    title: 'Reddit',
    text: '',
    url: 'https://www.reddit.com/'
  },
  {
    title: 'Github',
    text: 'Personal',
    url: 'https://github.com/ganesshkumar'
  },
  {
    title: 'Gitlab',
    text: 'Personal',
    url: 'https://gitlab.com/ganesshkumar'
  },
  {
    title: 'Gitlab',
    text: 'Mitter',
    url: 'https://git.nomadly.in'
  },
  {
    title: 'Blog',
    text: 'Personal',
    url: 'http://www.ganesshkumar.com'
  }
]

const QuickLinks = (props) => {
  renderLink = (link) => (
    <Paper zDepth={1} style={styles.link} key={link.url} >
      <a  target='_blank' style={styles.linkText} href={link.url}>
        <div style={styles.title}>{link.title}</div>
        <div style={styles.text}>{link.text}</div>
      </a>
    </Paper>
  )

  return (
    <div>
      <div style={styles.header}> Quick Links </div>
      <div style={styles.links}>
        {links.map(link => renderLink(link))}
      </div>
    </div>
  )
}

const styles = {
  header: {
    backgroundColor: Colors.grey300,
    color: Colors.grey800,
    padding: '10px'
  },
  links: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  link: {
    margin: '10px',
    textAlign: 'center',
    width: '100px'
  },
  linkText: {
    color: Colors.black,
    textDecoration: 'none'
  },
  title: {
    paddingTop: '5px'
  },
  text: {
    paddingBottom: '5px',
    fontSize: '0.7em'
  }
}

export default QuickLinks
