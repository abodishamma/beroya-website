import { ArrowUpRight } from "lucide-react";
import Brand from "../components/Brand";
import {
  footerProductLinks,
  navigation,
  socialLinks,
} from "../data/siteData";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Brand />
            <p>
              Premium automotive components engineered for demanding applications
              and global markets.
            </p>
          </div>

          <div className="footer__column">
            <span>Company</span>
            {navigation.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer__column">
            <span>Product systems</span>
            {footerProductLinks.map((item) => (
              <a key={item} href="#products">
                {item}
              </a>
            ))}
          </div>

          <div className="footer__column">
            <span>Connect</span>
            {socialLinks.map((item) => (
              <a key={item.label} href={item.href} aria-label={`${item.label} placeholder link`}>
                {item.label}
                <ArrowUpRight aria-hidden="true" size={13} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__statement" aria-hidden="true">
          <span>Engineered</span>
          <em>Beyond expectation.</em>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} BEROYA Auto Parts. All rights reserved.</p>
          <div>
            <a href="#">Privacy</a>
            <a href="#">Legal</a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
