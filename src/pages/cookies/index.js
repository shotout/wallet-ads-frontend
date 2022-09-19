import { Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import AuthFooter from '../../components/auth-footer';
import Page from '../../components/Page';
import useStyles from './styles';

const appIcon = '/assets/svg/wallet_logo.svg'

export default function Privacy(){
    const styles = useStyles()
    const [language, setLanguage] = useState('en')

    function renderContent(){
        if(language === 'ge'){
            return (
                <div className={styles.ctnDesc}>
                    <Typography variant='h4' fontWeight={"800"} marginBottom={2}>Datenschutz</Typography>
                    <Typography paragraph>Cookie Richtlinien (EU)</Typography>
                    <Typography paragraph>Diese Cookie-Richtlinie wurde zuletzt am 09 September 2022 aktualisiert und gilt f&uuml;r B&uuml;rger der Europ&auml;ischen Wirtschaftszone.</Typography>
                    <h2>1. Einf&uuml;hrungen</h2>
                    <Typography paragraph>Unsere Website,&nbsp;https://walletads.io&nbsp;(im folgenden: &ldquo;Die Website&rdquo;) verwendet Cookies und &auml;hnliche Technologien (der Einfachheit halber werden all diese unter &ldquo;Cookies&rdquo; zusammengefasst). Cookies werden au&szlig;erdem von uns beauftragten Drittparteien platziert. In dem unten stehendem Dokument informieren wir dich &uuml;ber die Verwendung von Cookies auf unserer Website.</Typography>
                    <h2>2. Was sind Cookies</h2>
                    <Typography paragraph>Ein Cookie ist eine einfache kleine Datei, die gemeinsam mit den Seiten einer Internetadresse versendet und vom Webbrowser auf dem PC oder einem anderen Ger&auml;t gespeichert werden kann. Die darin gespeicherten Informationen k&ouml;nnen w&auml;hrend folgender Besuche zu unseren oder den Servern relevanter Drittanbieter gesendet werden.</Typography>
                    <h2>3. Was sind Skripte?</h2>
                    <Typography paragraph>Ein Skript ist ein Teil des Programmcodes, mit dem unsere Website ordnungsgem&auml;&szlig; und interaktiv funktioniert. Dieser Code wird auf unserem Server oder auf deinem Ger&auml;t ausgef&uuml;hrt.</Typography>
                    <h2>4. Was ist ein Web Beacon?</h2>
                    <Typography paragraph>Ein Web-Beacon (auch Pixel-Tag genannt), ist ein kleines unsichtbares Textfragment oder Bild auf einer Website, das benutzt wird, um den Verkehr auf der Website zu &uuml;berwachen. Um dies zu erm&ouml;glichen werden diverse Daten von dir mittels Web-Beacons gespeichert.</Typography>
                    <h2>5. Zustimmung</h2>
                    <Typography paragraph>Wenn du unsere Website das erste Mal besuchst, zeigen wir Ihnen ein Pop-Up mit einer Erkl&auml;rung &uuml;ber Cookies. Sobald du auf &ldquo;Einstellungen speichern&rdquo; klickst, gibst du uns dein Einverst&auml;ndnis alle von dir gew&auml;hlten Kategorien von Cookies und Plugins wie in dieser Cookie-Richtlinie beschrieben zu verwenden. Du kannst die Verwendung von Cookies &uuml;ber deinen Browser deaktivieren, aber bitte beachte, dass unsere Website dann unter Umst&auml;nden nicht richtig funktioniert.</Typography>
                    <h3>5.1 Verwalte deine Zustimmungseinstellungen</h3>
                    <Typography paragraph>FunktionalStatistikenMarketing</Typography>
                    <h2>6. Cookies</h2>
                    <h3>6.1 Technische oder funktionelle Cookies</h3>
                    <Typography paragraph>Einige Cookies stellen sicher, dass Teile unserer Website richtig funktionieren und deine Nutzervorlieben bekannt bleiben. Durch das Platzieren funktionaler Cookies machen wir es dir einfacher unsere Website zu besuchen. Auf diese Weise musst du bei Besuchen unserer Website nicht wiederholt die gleichen Informationen eingeben, oder deine Gegenst&auml;nde bleiben beispielsweise in deinem Warenkorb bis du bezahlst. Wir k&ouml;nnen diese Cookies ohne dein Einverst&auml;ndnis platzieren.</Typography>
                    <h3>6.2 Analysecookies</h3>
                    <Typography paragraph>Wir verwenden analytische Cookies, um das Website-Erlebnis f&uuml;r unsere Nutzer zu optimieren. Mit diesen analytischen Cookies erhalten wir Einblicke in die Nutzung unserer Website.&nbsp;Wir bitten um deine Erlaubnis, analytische Cookies zu setzen.</Typography>
                    <h3>6.3 Werbecookies</h3>
                    <Typography paragraph>Auf dieser Website verwenden wir Werbe-Cookies, um Einblicke in die Kampagnenergebnisse zu erhalten. Dies geschieht basierend auf einem Profil, das wir basierend auf deinem Verhalten auf&nbsp;<a href="https://walletads.io">https://walletads.io</a> erstellen. Mit diesen Cookies bist du als Website-Besucher mit einer eindeutigen ID verkn&uuml;pft, k&ouml;nnen jedoch dein Verhalten und deine Interessen nicht f&uuml;r die Schaltung personalisierter Anzeigen profilieren.</Typography>
                    <Typography paragraph>Da diese Cookies als Verfolgungs-Cookie markiert sind, ben&ouml;tigen wir deine Zustimmung, um diese zu platzieren.</Typography>
                    <h3>6.4 Soziale-Medien-Buttons</h3>
                    <Typography paragraph>Auf unserer Website haben wir Schaltfl&auml;chen f&uuml;r Facebook, LinkedIn und Instagram eingef&uuml;gt, um Webseiten (z.B. &bdquo;Gef&auml;llt mir&rdquo;, &bdquo;Anheften&rdquo;) oder Teilen (z. B. &bdquo;Tweet&rdquo;) in sozialen Netzwerken wie Facebook, LinkedIn und Instagram zu unterst&uuml;tzen. Diese Schaltfl&auml;chen verwenden einen Code, der von Facebook, LinkedIn und Instagram selbst stammt. Dieser Code platziert Cookies. Diese Social-Media-Schaltfl&auml;chen k&ouml;nnen auch bestimmte Informationen speichern und verarbeiten, sodass dir eine personalisierte Werbung angezeigt werden kann.</Typography>
                    <Typography paragraph>Bitte lese die Datenschutzerkl&auml;rung dieser sozialen Netzwerke (die sich regelm&auml;&szlig;ig &auml;ndern kann), um zu erfahren, wie sie mit deinen (pers&ouml;nlichen) Daten umgehen, die sie mithilfe dieser Cookies verarbeiten. Die abgerufenen Daten werden so weit wie m&ouml;glich anonymisiert. Facebook, LinkedIn und Instagram befinden sich in den Vereinigten Staaten.</Typography>
                    <h2>7. Platzierte Cookies</h2>
                    <h3>Google Analytics</h3>
                    <Typography paragraph>Wir verwenden Google Analytics f&uuml;r Website-Statistik.&nbsp;<a href="https://cookiedatabase.org/service/google-analytics">Weiterlesen</a></Typography>
                    <div align="left">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Typography paragraph>Name</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Aufbewahrung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Funktion</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>Statistik (anonym)</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph><a href="https://cookiedatabase.org/cookie/google-analytics/_ga">_ga</a></Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>2 Jahre</Typography>
                                    </td>
                                    <td><br /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4>Weitergabe</h4>
                    <Typography paragraph>F&uuml;r weitere Informationen, bitte die&nbsp;<a href="https://policies.google.com/privacy">Google Analytics Datenschutzerkl&auml;rung</a> lesen.</Typography>
                    <h3>GDPR Cookie Consent</h3>
                    <Typography paragraph>Wir verwenden GDPR Cookie Consent f&uuml;r Verwaltung der Cookie-Einwilligung.&nbsp;<a href="https://cookiedatabase.org/service/gdpr-cookie-consent">Weiterlesen</a></Typography>
                    <Typography paragraph>&nbsp;</Typography>
                    <div align="left">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Typography paragraph>Name</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Aufbewahrung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Funktion</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>funktionelle</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph><a href="https://cookiedatabase.org/cookie/gdpr-cookie-consent/cookielawinfo-checkbox-necessary">cookielawinfo-checkbox-necessary</a></Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Sitzung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&uuml;berpr&uuml;ft, ob Cookies gesetzt werden k&ouml;nnen</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph><a href="https://cookiedatabase.org/cookie/gdpr-cookie-consent/cookielawinfo-checkbox-non-necessary">cookielawinfo-checkbox-non-necessary</a></Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Sitzung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&uuml;berpr&uuml;ft, ob Cookies gesetzt werden k&ouml;nnen</Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4>Weitergabe</h4>
                    <Typography paragraph>Diesen Daten werden nicht mit Drittparteien geteilt.</Typography>
                    <h3>WPML</h3>
                    <Typography paragraph>Wir verwenden WPML f&uuml;r Verwaltung der Gebietsschemen.&nbsp;<a href="https://cookiedatabase.org/service/wpml">Weiterlesen</a></Typography>
                    <div align="left">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Typography paragraph>Name</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Aufbewahrung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Funktion</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>Gegenstand der Untersuchung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph><a href="https://cookiedatabase.org/cookie/wpml/_icl_visitor_lang_js">_icl_visitor_lang_js</a></Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>funktionelle</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph><a href="https://cookiedatabase.org/cookie/wpml/wp-wpml_current_language">wp-wpml_current_language</a></Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>1 Tag</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Speichere Spracheinstellungen</Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4>Weitergabe</h4>
                    <Typography paragraph>Diesen Daten werden nicht mit Drittparteien geteilt.</Typography>
                    <h3>Cookie Notice for GDPR</h3>
                    <Typography paragraph>Wir verwenden Cookie Notice for GDPR f&uuml;r Verwaltung der Cookie-Einwilligung.&nbsp;<a href="https://cookiedatabase.org/service/cookie-notice-for-gdpr">Weiterlesen</a></Typography>
                    <div align="left">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Typography paragraph>Name</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Aufbewahrung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Funktion</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>funktionelle</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph><a href="https://cookiedatabase.org/cookie/cookie-notice-for-gdpr/cookie_notice_accepted">cookie_notice_accepted</a></Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>hartn&auml;ckig</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&uuml;berpr&uuml;ft, ob Cookies gesetzt werden k&ouml;nnen</Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4>Weitergabe</h4>
                    <Typography paragraph>Diesen Daten werden nicht mit Drittparteien geteilt.</Typography>
                    <h3>CloudFlare</h3>
                    <Typography paragraph>Wir verwenden CloudFlare f&uuml;r Content Distribution Network (CDN) Dienst.&nbsp;<a href="https://cookiedatabase.org/service/cloudflare">Weiterlesen</a></Typography>
                    <div align="left">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Typography paragraph>Name</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Aufbewahrung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Funktion</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>funktionelle</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph><a href="https://cookiedatabase.org/cookie/cloudflare/__cfduid">__cfduid</a></Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>30 Tage</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Identify trusted web traffic</Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4>Weitergabe</h4>
                    <Typography paragraph>F&uuml;r weitere Informationen, bitte die&nbsp;<a href="https://www.cloudflare.com/privacypolicy">CloudFlare Datenschutzerkl&auml;rung</a> lesen.</Typography>
                    <h3>Google Fonts</h3>
                    <Typography paragraph>Wir verwenden Google Fonts f&uuml;r Anzeige von Webfonts.&nbsp;<a href="https://cookiedatabase.org/service/google-fonts">Weiterlesen</a></Typography>
                    <div align="left">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Typography paragraph>Name</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Aufbewahrung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Funktion</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>Gegenstand der Untersuchung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>Google Fonts API</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4>Weitergabe</h4>
                    <Typography paragraph>F&uuml;r weitere Informationen, bitte die&nbsp;<a href="https://policies.google.com/privacy">Google Fonts Datenschutzerkl&auml;rung</a> lesen.</Typography>
                    <h3>Facebook</h3>
                    <Typography paragraph>Wir verwenden Facebook f&uuml;r Anzeige der letzten Social-Posts und/oder Social-Share-Buttons.&nbsp;<a href="https://cookiedatabase.org/service/facebook">Weiterlesen</a></Typography>
                    <div align="left">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Typography paragraph>Name</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Aufbewahrung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Funktion</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>Gegenstand der Untersuchung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>_js_datr</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>_fbc</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>fbm*</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>xs</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>wd</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>fr</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>act</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>_fbp</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>datr</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>c_user</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>csm</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>sb</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>presence</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>*_fbm_</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4>Weitergabe</h4>
                    <Typography paragraph>F&uuml;r weitere Informationen, bitte die&nbsp;<a href="https://www.facebook.com/policy/cookies">Facebook Datenschutzerkl&auml;rung</a> lesen.</Typography>
                    <h3>Instagram</h3>
                    <Typography paragraph>Wir verwenden Instagram f&uuml;r Anzeige der letzten Social-Posts und/oder Social-Share-Buttons.&nbsp;<a href="https://cookiedatabase.org/service/instagram">Weiterlesen</a></Typography>
                    <div align="left">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Typography paragraph>Name</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Aufbewahrung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Funktion</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>Gegenstand der Untersuchung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>actppresence</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4>Weitergabe</h4>
                    <Typography paragraph>F&uuml;r weitere Informationen, bitte die&nbsp;<a href="https://help.instagram.com/519522125107875">Instagram Datenschutzerkl&auml;rung</a> lesen.</Typography>
                    <h3>LinkedIn</h3>
                    <Typography paragraph>Wir verwenden LinkedIn f&uuml;r Anzeige der letzten Social-Posts und/oder Social-Share-Buttons.&nbsp;<a href="https://cookiedatabase.org/service/linkedin">Weiterlesen</a></Typography>
                    <div align="left">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Typography paragraph>Name</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Aufbewahrung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Funktion</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>Gegenstand der Untersuchung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>bcookie</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>li-oatml</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>BizographicsOptOut</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>li_sugr</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>UserMatchHistory</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>linkedin_oauth_*</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>lidc</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>bscookie</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>X-LI-IDC</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4>Weitergabe</h4>
                    <Typography paragraph>F&uuml;r weitere Informationen, bitte die&nbsp;<a href="https://www.linkedin.com/legal/privacy-policy">LinkedIn Datenschutzerkl&auml;rung</a> lesen.</Typography>
                    <h3>Sonstiges</h3>
                    <div align="left">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Typography paragraph>Name</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Aufbewahrung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>Funktion</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>Gegenstand der Untersuchung</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>&nbsp;</Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>complianz_policy_id</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>365 Tage</Typography>
                                    </td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>cmplz_marketing</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>365 Tage</Typography>
                                    </td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>complianz_consent_status</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>365 Tage</Typography>
                                    </td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>wp-saving-post</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>_gid</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>wp-autosave-1</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>cmplz_stats</Typography>
                                    </td>
                                    <td>
                                        <Typography paragraph>365 Tage</Typography>
                                    </td>
                                    <td><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography paragraph>_gat</Typography>
                                    </td>
                                    <td><br /></td>
                                    <td><br /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4>Weitergabe</h4>
                    <Typography paragraph>Diesen Daten werden nicht mit Drittparteien geteilt.</Typography>
                    <h2>8. Deine Rechte in Bezug auf pers&ouml;nliche Daten</h2>
                    <Typography paragraph>Du hast in Bezug auf deine pers&ouml;nlichen Daten die folgenden Rechte:</Typography>
                    <ul>
                        <li>
                            <Typography paragraph>Du hast das Recht zu wissen, warum deine pers&ouml;nlichen Daten gebraucht werden, was mit ihnen passiert und wie lange diese verwahrt werden.</Typography>
                        </li>
                        <li>
                            <Typography paragraph>Zugriffsrecht: Du hast das Recht deine uns bekannten pers&ouml;nlichen Daten einzusehen.</Typography>
                        </li>
                        <li>
                            <Typography paragraph>Recht auf Berichtigung: Du hast das Recht wann immer du w&uuml;nscht, deine pers&ouml;nlichen Daten zu erg&auml;nzen, zu korrigieren sowie gel&ouml;scht oder blockiert zu bekommen.</Typography>
                        </li>
                        <li>
                            <Typography paragraph>Wenn du uns dein Einverst&auml;ndnis zur Verarbeitung deiner Daten gegeben hast, hast du das Recht dieses Einverst&auml;ndnis zu widerrufen und deine pers&ouml;nlichen Daten l&ouml;schen zu lassen.</Typography>
                        </li>
                        <li>
                            <Typography paragraph>Recht auf Datentransfer deiner Daten: Du hast das Recht, alle deine pers&ouml;nlichen Daten von einem Kontrolleur anzufordern und in ihrer Gesamtheit zu einem anderen Kontrolleur zu transferieren.</Typography>
                        </li>
                        <li>
                            <Typography paragraph>Widerspruchsrecht: Du kannst der Verarbeitung deiner Daten widersprechen. Wir entsprechen dem, es sei denn es gibt berechtigte Gr&uuml;nde f&uuml;r die Verarbeitung.</Typography>
                        </li>
                    </ul>
                    <Typography paragraph>Um diese Rechte auszu&uuml;ben kontaktiere uns bitte. Bitte beziehe dich auf die Kontaktdaten am Ende dieser Cookie-Erkl&auml;rung. Wenn du eine Beschwerde dar&uuml;ber hast, wie wir deine Daten behandeln, w&uuml;rden wir diese gerne h&ouml;ren, aber du hast auch das Recht diese an die Aufsichtsbeh&ouml;rde (der Datenschutzbeh&ouml;rde) zu richten.</Typography>
                    <h2>9. Aktivierung/Deaktivierung und L&ouml;schen von Cookies</h2>
                    <Typography paragraph>Du kannst deinen Internetbrowser verwenden, um Cookies automatisch oder manuell zu l&ouml;schen. Du kannst auch festlegen, dass bestimmte Cookies m&ouml;glicherweise nicht platziert werden. Eine weitere M&ouml;glichkeit besteht darin, die Einstellungen deines Internetbrowsers so zu &auml;ndern, dass du jedes Mal eine Nachricht erh&auml;ltst, wenn ein Cookie gesetzt wird. Weitere Informationen zu diesen Optionen findest du in den Anweisungen im Hilfebereich deines Browsers.</Typography>
                    <Typography paragraph>Bitte nimm zur Kenntnis, dass unsere Website m&ouml;glicherweise nicht richtig funktioniert, wenn alle Cookies deaktiviert sind. Wenn du die Cookies in deinem Browser l&ouml;schst, werden diese neu platziert, wenn du unsere Website erneut besuchst.</Typography>
                    <h2>10. Kontaktdaten</h2>
                    <Typography paragraph>F&uuml;r Fragen und/oder Kommentare &uuml;ber unsere Cookie-Richtlinien und diese Aussage kontaktiere uns bitte mittels der folgenden Kontaktdaten:</Typography>
                    <Typography paragraph>Admiral Studio GmbH<br />Urbanstr. 71<br />10967 Berlin<br />Deutschland<br />Website: admiral.studio<br />Email: walletads@admiral.studio&nbsp;<br />Phone: +49 177 314 0680</Typography>
                    <Typography paragraph>&nbsp;</Typography>
                    <Typography paragraph><br /></Typography>
                </div>
            )
        }
        return (
            <div className={styles.ctnDesc}>
                <Typography variant='h4' fontWeight={"800"} marginBottom={2}>Cookie Policy (EU)</Typography>
                <Typography paragraph>This Cookie Policy was last updated on 09 September 2022 and applies to citizens of the European Economic Area.</Typography>
                <Typography paragraph>1. Introduction</Typography>
                <Typography paragraph>Our website,&nbsp;<a href="https://walletads.io">https://walletads.io</a> (hereinafter: &ldquo;the website&rdquo;) uses cookies and other related technologies (for convenience all technologies are referred to as &ldquo;cookies&rdquo;). Cookies are also placed by third parties we have engaged. In the document below we inform you about the use of cookies on our website.</Typography>
                <Typography paragraph>2. What are cookies?</Typography>
                <Typography paragraph>A cookie is a small simple file that is sent along with pages of this website and stored by your browser on the hard drive of your computer or another device. The information stored therein may be returned to our servers or to the servers of the relevant third parties during a subsequent visit.</Typography>
                <Typography paragraph>3. What are scripts?</Typography>
                <Typography paragraph>A script is a piece of program code that is used to make our website function properly and interactively. This code is executed on our server or on your device.</Typography>
                <Typography paragraph>4. What is a web beacon?</Typography>
                <Typography paragraph>A web beacon (or a pixel tag) is a small, invisible piece of text or image on a website that is used to monitor traffic on a website. In order to do this, various data about you is stored using web beacons.</Typography>
                <Typography paragraph>5. Consent</Typography>
                <Typography paragraph>When you visit our website for the first time, we will show you a pop-up with an explanation about cookies. As soon as you click on &ldquo;Save settings&rdquo;, you consent to us using the categories of cookies and plug-ins you selected in the pop-up, as described in this Cookie Policy. You can disable the use of cookies via your browser, but please note that our website may no longer work properly.</Typography>
                <Typography paragraph>5.1 Manage your consent settings</Typography>
                <Typography paragraph>FunctionalStatisticsMarketing</Typography>
                <Typography paragraph>6. Cookies</Typography>
                <Typography paragraph>6.1 Technical or functional cookies</Typography>
                <Typography paragraph>Some cookies ensure that certain parts of the website work properly and that your user preferences remain known. By placing functional cookies, we make it easier for you to visit our website. This way, you do not need to repeatedly enter the same information when visiting our website and, for example, the items remain in your shopping cart until you have paid. We may place these cookies without your consent.</Typography>
                <Typography paragraph>6.2 Analytical cookies</Typography>
                <Typography paragraph>We use analytical cookies to optimize the website experience for our users. With these analytical cookies we get insights in the usage of our website.&nbsp;We ask your permission to place analytical cookies.</Typography>
                <Typography paragraph>6.3 Advertising cookies</Typography>
                <Typography paragraph>On this website we use advertising cookies, enabling us to gain insights into the campaign results. This happens based on a profile we create based on your behaviour on&nbsp;<a href="https://walletads.io">https://walletads.io</a>. With these cookies you, as website visitor are linked to a unique ID, but will not profile your behaviour and interests to serve personalized ads.</Typography>
                <Typography paragraph>Because these cookies are marked as tracking cookies, we ask your permission to place these.</Typography>
                <Typography paragraph>6.4 Social media buttons</Typography>
                <Typography paragraph>On our website we have included buttons for Facebook, LinkedIn and Instagram to promote webpages (e.g. &ldquo;like&rdquo;, &ldquo;pin&rdquo;) or share (e.g. &ldquo;tweet&rdquo;) on social networks like Facebook, LinkedIn and Instagram. These buttons work using pieces of code coming from Facebook, LinkedIn and Instagram themselves. This code places cookies. These social media buttons also can store and process certain information, so a personalized advertisement can be shown to you.</Typography>
                <Typography paragraph>Please read the privacy statement of these social networks (which can change regularly) to read what they do with your (personal) data which they process using these cookies. The data that is retrieved is anonymized as much as possible. Facebook, LinkedIn and Instagram are located in the United States.</Typography>
                <Typography paragraph>7. Placed cookies</Typography>
                <Typography paragraph>Google Analytics</Typography>
                <Typography paragraph>We use Google Analytics for website statistics.&nbsp;<a href="https://cookiedatabase.org/service/google-analytics">Read more</a></Typography>
                <div align="left">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography paragraph>Name</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Retention</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Function</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>Statistics (anonymous)</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph><a href="https://cookiedatabase.org/cookie/google-analytics/_ga">_ga</a></Typography>
                                </td>
                                <td>
                                    <Typography paragraph>2 years</Typography>
                                </td>
                                <td><br /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Typography paragraph>Sharing</Typography>
                <Typography paragraph>For more information, please read the&nbsp;<a href="https://policies.google.com/privacy">Google Analytics Privacy Statement</a>.</Typography>
                <Typography paragraph>GDPR Cookie Consent</Typography>
                <Typography paragraph>We use GDPR Cookie Consent for cookie consent management.&nbsp;<a href="https://cookiedatabase.org/service/gdpr-cookie-consent">Read more</a></Typography>
                <div align="left">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography paragraph>Name</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Retention</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Function</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>Functional</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph><a href="https://cookiedatabase.org/cookie/gdpr-cookie-consent/cookielawinfo-checkbox-necessary">cookielawinfo-checkbox-necessary</a></Typography>
                                </td>
                                <td>
                                    <Typography paragraph>session</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Check if cookies can be placed</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph><a href="https://cookiedatabase.org/cookie/gdpr-cookie-consent/cookielawinfo-checkbox-non-necessary">cookielawinfo-checkbox-non-necessary</a></Typography>
                                </td>
                                <td>
                                    <Typography paragraph>session</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Check if cookies can be placed</Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Typography paragraph>Sharing</Typography>
                <Typography paragraph>This data is not shared with third parties.</Typography>
                <h3>WPML</h3>
                <Typography paragraph>We use WPML for locale management.&nbsp;<a href="https://cookiedatabase.org/service/wpml">Read more</a></Typography>
                <div align="left">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography paragraph>Name</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Retention</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Function</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>Purpose pending investigation</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph><a href="https://cookiedatabase.org/cookie/wpml/_icl_visitor_lang_js">_icl_visitor_lang_js</a></Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>Functional</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph><a href="https://cookiedatabase.org/cookie/wpml/wp-wpml_current_language">wp-wpml_current_language</a></Typography>
                                </td>
                                <td>
                                    <Typography paragraph>1 day</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Store language settings</Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Typography paragraph>Sharing</Typography>
                <Typography paragraph>This data is not shared with third parties.</Typography>
                <h3>Cookie Notice for GDPR</h3>
                <Typography paragraph>We use Cookie Notice for GDPR for cookie consent management.&nbsp;<a href="https://cookiedatabase.org/service/cookie-notice-for-gdpr">Read more</a></Typography>
                <div align="left">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography paragraph>Name</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Retention</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Function</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>Functional</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph><a href="https://cookiedatabase.org/cookie/cookie-notice-for-gdpr/cookie_notice_accepted">cookie_notice_accepted</a></Typography>
                                </td>
                                <td>
                                    <Typography paragraph>persistent</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Check if cookies can be placed</Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Typography paragraph>Sharing</Typography>
                <Typography paragraph>This data is not shared with third parties.</Typography>
                <h3>CloudFlare</h3>
                <Typography paragraph>We use CloudFlare for content distribution network (CDN) services.&nbsp;<a href="https://cookiedatabase.org/service/cloudflare">Read more</a></Typography>
                <div align="left">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography paragraph>Name</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Retention</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Function</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>Functional</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph><a href="https://cookiedatabase.org/cookie/cloudflare/__cfduid">__cfduid</a></Typography>
                                </td>
                                <td>
                                    <Typography paragraph>30 days</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Identify trusted web traffic</Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Typography paragraph>Sharing</Typography>
                <Typography paragraph>For more information, please read the&nbsp;<a href="https://www.cloudflare.com/privacypolicy">CloudFlare Privacy Statement</a>.</Typography>
                <h3>Google Fonts</h3>
                <Typography paragraph>We use Google Fonts for display of webfonts.&nbsp;<a href="https://cookiedatabase.org/service/google-fonts">Read more</a></Typography>
                <div align="left">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography paragraph>Name</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Retention</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Function</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>Purpose pending investigation</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>Google Fonts API</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Typography paragraph>Sharing</Typography>
                <Typography paragraph>For more information, please read the&nbsp;<a href="https://policies.google.com/privacy">Google Fonts Privacy Statement</a>.</Typography>
                <h3>Facebook</h3>
                <Typography paragraph>We use Facebook for display of recent social posts and/or social share buttons.&nbsp;<a href="https://cookiedatabase.org/service/facebook">Read more</a></Typography>
                <div align="left">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography paragraph>Name</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Retention</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Function</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>Purpose pending investigation</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>_js_datr</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>actppresence</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>_fbc</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>fbm*</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>xs</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>wd</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>fr</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>act</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>_fbp</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>datr</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>c_user</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>csm</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>sb</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>presence</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>*_fbm_</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Typography paragraph>Sharing</Typography>
                <Typography paragraph>For more information, please read the&nbsp;<a href="https://www.facebook.com/policy/cookies">Facebook Privacy Statement</a>.</Typography>
                <h3>Instagram</h3>
                <Typography paragraph>We use Instagram for display of recent social posts and/or social share buttons.&nbsp;<a href="https://cookiedatabase.org/service/instagram">Read more</a></Typography>
                <div align="left">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography paragraph>Name</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Retention</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Function</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>Purpose pending investigation</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>actppresence</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Typography paragraph>Sharing</Typography>
                <Typography paragraph>For more information, please read the&nbsp;<a href="https://help.instagram.com/519522125107875">Instagram Privacy Statement</a>.</Typography>
                <h3>LinkedIn</h3>
                <Typography paragraph>We use LinkedIn for display of recent social posts and/or social share buttons.&nbsp;<a href="https://cookiedatabase.org/service/linkedin">Read more</a></Typography>
                <div align="left">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography paragraph>Name</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Retention</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Function</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>Purpose pending investigation</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>bcookie</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>li-oatml</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>BizographicsOptOut</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>li_sugr</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>UserMatchHistory</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>linkedin_oauth_*</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>lidc</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>bscookie</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>X-LI-IDC</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Typography paragraph>Sharing</Typography>
                <Typography paragraph>For more information, please read the&nbsp;<a href="https://www.linkedin.com/legal/privacy-policy">LinkedIn Privacy Statement</a>.</Typography>
                <h3>Miscellaneous</h3>
                <div align="left">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography paragraph>Name</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Retention</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>Function</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>Purpose pending investigation</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>&nbsp;</Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>complianz_policy_id</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>365 days</Typography>
                                </td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>cmplz_marketing</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>365 days</Typography>
                                </td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>complianz_consent_status</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>365 days</Typography>
                                </td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>wp-saving-post</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>_gid</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>wp-autosave-1</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>cmplz_stats</Typography>
                                </td>
                                <td>
                                    <Typography paragraph>365 days</Typography>
                                </td>
                                <td><br /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography paragraph>_gat</Typography>
                                </td>
                                <td><br /></td>
                                <td><br /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Typography paragraph>Sharing</Typography>
                <Typography paragraph>This data is not shared with third parties.</Typography>
                <h2>8. Your rights with respect to personal data</h2>
                <Typography paragraph>You have the following rights with respect to your personal data:</Typography>
                <ul>
                    <li>
                        <Typography paragraph>You have the right to know why your personal data is needed, what will happen to it, and how long it will be retained for.</Typography>
                    </li>
                    <li>
                        <Typography paragraph>Right of access: You have the right to access your personal data that is known to us.</Typography>
                    </li>
                    <li>
                        <Typography paragraph>Right to rectification: you have the right to supplement, correct, have deleted or blocked your personal data whenever you wish.</Typography>
                    </li>
                    <li>
                        <Typography paragraph>If you give us your consent to process your data, you have the right to revoke that consent and to have your personal data deleted.</Typography>
                    </li>
                    <li>
                        <Typography paragraph>Right to transfer your data: you have the right to request all your personal data from the controller and transfer it in its entirety to another controller.</Typography>
                    </li>
                    <li>
                        <Typography paragraph>Right to object: you may object to the processing of your data. We comply with this, unless there are justified grounds for processing.</Typography>
                    </li>
                </ul>
                <Typography paragraph>To exercise these rights, please contact us. Please refer to the contact details at the bottom of this Cookie Policy. If you have a complaint about how we handle your data, we would like to hear from you, but you also have the right to submit a complaint to the supervisory authority (the Data Protection Authority).</Typography>
                <h2>9. Enabling/disabling and deleting cookies</h2>
                <Typography paragraph>You can use your internet browser to automatically or manually delete cookies. You can also specify that certain cookies may not be placed. Another option is to change the settings of your internet browser so that you receive a message each time a cookie is placed. For more information about these options, please refer to the instructions in the Help section of your browser.</Typography>
                <Typography paragraph>Please note that our website may not work properly if all cookies are disabled. If you do delete the cookies in your browser, they will be placed again after your consent when you visit our websites again.</Typography>
                <h2>10. Contact details</h2>
                <Typography paragraph>For questions and/or comments about our Cookie Policy and this statement, please contact us by using the following contact details:</Typography>
                <Typography paragraph>Admiral Studio GmbH<br />Urbanstr. 71<br />10967 Berlin<br />Germany<br />Website: admiral.studio<br />Email: walletads@admiral.studio&nbsp;<br />Phone: +49 177 314 0680</Typography>
                <Typography paragraph><br /></Typography>
            </div>
        )
    }

    function renderHeader(){
        return (
            <div className={styles.ctnHeader}>
                <div className={styles.ctnLeft}>
                    <Typography onClick={() => {setLanguage('ge')}} variant='h6' color="#7589FA" fontWeight={"800"}>DEUTSCHE VERSION</Typography>
                    <Typography onClick={() => {setLanguage('en')}} variant='h6' color="#7589FA" fontWeight={"800"}>ENGLISH VERSION</Typography>
                </div>
                <div className={styles.ctnRight}>
                    <Link href="/">
                        <a>
                            <img src={appIcon} alt="wallet-ads" />
                        </a>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <Page title="Privacy">
            <div className={styles.ctnRoot}>
                <div className={styles.ctnContent}>
                    {renderHeader()}
                    {renderContent()}
                </div>
                <AuthFooter />
            </div>
        </Page>
    )
}