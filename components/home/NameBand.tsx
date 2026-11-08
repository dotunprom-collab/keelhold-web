import styles from "./NameBand.module.css";

const PARTS = [
  { title: "Keel", body: "A keel keeps a vessel upright." },
  { title: "Hold", body: "A hold keeps what matters safe." },
];

export function NameBand() {
  return (
    <section className={styles.band} aria-labelledby="name-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={`eyebrow ${styles.eyebrow}`}>The name</p>
          <h2 id="name-heading" className={styles.heading}>
            We are built to do both.
          </h2>
        </div>
        <div className={styles.pair}>
          {PARTS.map((p) => (
            <div key={p.title} className={styles.part}>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.body}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
