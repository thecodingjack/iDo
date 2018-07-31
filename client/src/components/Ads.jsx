import React from 'react';

export default class Ads extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
        <ins className='adsbygoogle'
          style={{ display: 'block' }}
          data-adtest= "on"
          data-ad-client='ca-pub-4707967927304028'
          data-ad-format='auto' />
    );
  }
}