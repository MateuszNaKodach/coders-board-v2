# Architecture Decision Records - Conventions

In directory doc/architecture/decisions you can find Architecture Decision Records.

## Tools

To create and manage ADR-s we use [adt-tools](https://github.com/npryce/adr-tools)

## Naming convention

- **SYS**: Decisions considering whole system including development|deployment|maintenance process
- **APP**: Decisions considering concrete application. For now we have one so prefix is APP, but in the future it may change
- **APP-<module_name>**: Decisions considering particular module. List of modules can be found on C4 diagram. 


## Content convention

Only obligatory sections are:
- Name (in first line) This is what is displayed in structurizr (if is in use)
- Status (Proposed / Accepted / Superseded / Deprecated / Rejected)
- Context
- Decision

If there is need for additional you can add them freely :) 
