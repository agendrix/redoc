import * as React from 'react';
import { useState } from 'react';
import { SecurityRequirementModel } from '../../services/models/SecurityRequirement';
import {
  AuthHeader,
  AuthHeaderColumn,
  SecuritiesColumn,
  SecurityDetailsStyle,
  Wrap,
} from './styled.elements';
import { useStore } from '../StoreBuilder';
import { SecurityHeader } from './SecurityHeader';
import { RequiredScopesRow } from './RequiredScopesRow';
import { AUTH_TYPES } from '../SecuritySchemes/SecuritySchemes';
import { Markdown } from '../Markdown/Markdown';
import { SecurityDetails } from './SecurityDetails';
import { ShelfIcon } from '../../common-elements';

export interface SecurityRequirementsProps {
  securities: SecurityRequirementModel[];
}

export function SecurityRequirements(props: SecurityRequirementsProps) {
  const store = useStore();
  const showSecuritySchemeType = store?.options.showSecuritySchemeType;
  const [expanded, setExpanded] = useState(false);

  const { securities } = props;

  if (!securities?.length || store?.options.hideSecuritySection) {
    return null;
  }

  const operationSecuritySchemes = store?.spec.securitySchemes.schemes.filter(({ id }) => {
    return securities.find(security => security.schemes.find(scheme => scheme.id === id));
  });

  return (
    <>
      <Wrap $expanded={expanded}>
        <AuthHeaderColumn onClick={() => setExpanded(!expanded)} style={{ display: 'flex' }}>
          <AuthHeader>Authorizations:</AuthHeader>
          <ShelfIcon size={'1.3em'} direction={expanded ? 'down' : 'right'} />
        </AuthHeaderColumn>
        <SecuritiesColumn $expanded={expanded}>
          {securities.map((security, idx) => (
            <SecurityHeader
              key={idx}
              expanded={expanded}
              showSecuritySchemeType={showSecuritySchemeType}
              security={security}
            />
          ))}
        </SecuritiesColumn>
      </Wrap>
      {expanded &&
        !!operationSecuritySchemes?.length &&
        operationSecuritySchemes.map((scheme, idx) => (
          <SecurityDetailsStyle key={idx}>
            <h5>
              {AUTH_TYPES[scheme.type] || scheme.type}: {scheme.id}
            </h5>
            <Markdown source={scheme.description || ''} />
            <SecurityDetails
              key={scheme.id}
              scheme={scheme}
              RequiredScopes={
                <RequiredScopesRow scopes={getRequiredScopes(scheme.id, securities)} />
              }
            />
          </SecurityDetailsStyle>
        ))}
    </>
  );
}

function getRequiredScopes(id: string, securities: SecurityRequirementModel[]): string[] {
  const allScopes: string[] = [];
  let securitiesLength = securities.length;

  while (securitiesLength--) {
    const security = securities[securitiesLength];
    let schemesLength = security.schemes.length;
    while (schemesLength--) {
      const scheme = security.schemes[schemesLength];
      if (scheme.id === id && Array.isArray(scheme.scopes)) {
        allScopes.push(...scheme.scopes);
      }
    }
  }

  return Array.from(new Set(allScopes));
}
