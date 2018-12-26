<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:reqns="http://www.PZ5XEIQ.JZ5XEQ.Request.com" xmlns:resns="http://www.PZ5XEIQ.JZ5XER.Response.com" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://www.PZ5XEIQ.JZ5XEQ.Request.com" version="1.0">

	<xsl:output encoding="utf-8" indent="yes" method="xml" omit-xml-declaration="yes"/>

	<!-- Stylesheet to inject namespaces into a document in specific places -->
	<xsl:template match="/">
		<soapenv:Envelope>
			<soapenv:Header/>
			<soapenv:Body>
				<xsl:choose>
					<!-- Handle 'Root' wrapper added by JSON to XML policy -->
					<xsl:when test="normalize-space(/Root)">
						<reqns:PZ5XEIQOperation>
							<xsl:apply-templates select="node()|@*"/>
						</reqns:PZ5XEIQOperation>
					</xsl:when>
					<!-- Handle 'Array' wrapper added by JSON to XML policy -->
					<xsl:when test="normalize-space(/Array)">
						<reqns:PZ5XEIQOperation>
							<xsl:apply-templates select="node()|@*"/>
						</reqns:PZ5XEIQOperation>
					</xsl:when>
					<!-- If the root element is not what was in the schema, add it -->
					<xsl:when test="not(normalize-space(/PZ5XEIQOperation))">
						<reqns:PZ5XEIQOperation>
							<xsl:apply-templates select="node()|@*"/>
						</reqns:PZ5XEIQOperation>
					</xsl:when>
					<!-- everything checks out,  just copy the xml-->
					<xsl:otherwise>
						<xsl:apply-templates select="node()|@*"/>
					</xsl:otherwise>
				</xsl:choose>
			</soapenv:Body>
		</soapenv:Envelope>
	</xsl:template>

	<xsl:template match="/Root/*" name="copy-root">
		<xsl:element name="reqns:{local-name()}">
			<xsl:copy-of select="namespace::*"/>
			<xsl:apply-templates select="node()|@*"/>
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="/Array/*" name="copy-array">
		<xsl:element name="reqns:{local-name()}">
			<xsl:copy-of select="namespace::*"/>
			<xsl:apply-templates select="node()|@*"/>
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="*[not(local-name()='Root') and not(local-name()='Array')]" name="copy-all">
		<xsl:element name="reqns:{local-name()}">
			<xsl:copy-of select="namespace::*"/>
			<xsl:apply-templates select="node()|@*"/>
		</xsl:element>
	</xsl:template>

	<!-- template to copy the rest of the nodes -->
	<xsl:template match="comment() | processing-instruction()">
		<xsl:copy/>
	</xsl:template>
</xsl:stylesheet>
