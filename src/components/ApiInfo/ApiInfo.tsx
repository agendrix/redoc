import { observer } from 'mobx-react';
import * as React from 'react';

import { AppStore } from '../../services/AppStore';

import { MiddlePanel, Row, Section } from '../../common-elements/';
import { ExternalDocumentation } from '../ExternalDocumentation/ExternalDocumentation';
import { Markdown } from '../Markdown/Markdown';
import { StyledMarkdownBlock } from '../Markdown/styled.elements';
import { ApiHeader, InfoSpan, InfoSpanBox, InfoSpanBoxWrap } from './styled.elements';

export interface ApiInfoProps {
  store: AppStore;
}

@observer
export class ApiInfo extends React.Component<ApiInfoProps> {
  handleDownloadClick = e => {
    if (!e.target.href) {
      e.target.href = this.props.store.spec.info.downloadLink;
    }
  };

  render() {
    const { store } = this.props;
    const { info, externalDocs } = store.spec;

    const license =
      (info.license && (
        <InfoSpan>
          License:{' '}
          {info.license.identifier ? (
            info.license.identifier
          ) : (
            <a href={info.license.url}>{info.license.name}</a>
          )}
        </InfoSpan>
      )) ||
      null;

    const website =
      (info.contact && info.contact.url && (
        <InfoSpan>
          URL: <a href={info.contact.url}>{info.contact.url}</a>
        </InfoSpan>
      )) ||
      null;

    const email =
      (info.contact && info.contact.email && (
        <InfoSpan>
          {info.contact.name || 'E-mail'}:{' '}
          <a href={'mailto:' + info.contact.email}>{info.contact.email}</a>
        </InfoSpan>
      )) ||
      null;

    const terms =
      (info.termsOfService && (
        <InfoSpan>
          <a href={info.termsOfService}>Terms of Service</a>
        </InfoSpan>
      )) ||
      null;

    const version = (info.version && <span>({info.version})</span>) || null;

    return (
      <Section $padding="20" $underlined={true}>
        <Row>
          <MiddlePanel className="api-info">
            <ApiHeader>
              {info.title} {version}
            </ApiHeader>
            <StyledMarkdownBlock>
              {((info.license || info.contact || info.termsOfService) && (
                <InfoSpanBoxWrap>
                  <InfoSpanBox>
                    {email} {website} {license} {terms}
                  </InfoSpanBox>
                </InfoSpanBoxWrap>
              )) ||
                null}
            </StyledMarkdownBlock>
            <Markdown source={store.spec.info.summary} data-role="redoc-summary" />
            <Markdown source={store.spec.info.description} data-role="redoc-description" />
            {externalDocs && <ExternalDocumentation externalDocs={externalDocs} />}
          </MiddlePanel>
        </Row>
      </Section>
    );
  }
}
