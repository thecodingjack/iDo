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
          data-ad-client='ca-app-pub-3940256099942544'
          data-ad-slot='6300978111'
          data-ad-format='auto'
          data-enable-page-level-ads= 'true' />
    );
  }
}