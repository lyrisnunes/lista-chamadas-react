import styles from "./Card.module.css";

export function Card({ name, role, time }) {
  return (
    <div className={styles.card}>
      <span>{role}</span>
      <strong>{name}</strong>
      <small>{time}</small>
    </div>
  );
}
