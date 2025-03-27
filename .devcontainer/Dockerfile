ARG IMAGE_VERSION
FROM mcr.microsoft.com/devcontainers/base:${IMAGE_VERSION}

RUN apt -y update \
    && apt -y upgrade \
    && apt -y full-upgrade \
    && apt -y install --no-install-recommends dnsutils iputils-ping \
    && apt -y autoremove \
    && apt -y clean
