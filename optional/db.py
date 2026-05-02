from typing import List, Optional
from sqlalchemy import create_engine, ForeignKey, String, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, sessionmaker

# ---------------- BASE ----------------
class Base(DeclarativeBase):
    pass


# ---------------- MODELS ----------------
class User(Base):
    __tablename__ = "user_account"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    fullname: Mapped[Optional[str]]

    addresses: Mapped[List["Address"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan"
    )


class Address(Base):
    __tablename__ = "address"

    id: Mapped[int] = mapped_column(primary_key=True)
    email_address: Mapped[str]
    user_id: Mapped[int] = mapped_column(ForeignKey("user_account.id"))

    user: Mapped[User] = relationship(back_populates="addresses")


# ---------------- DB SETUP ----------------
DATABASE_URL = "sqlite:///./app.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

# CREATE TABLES (THIS WAS MISSING)
Base.metadata.create_all(bind=engine)

# ---------------- SESSION ----------------
session = SessionLocal()

# ---------------- OPTIONAL TEST DATA ----------------
if not session.scalars(select(User)).first():
    user = User(name="asdf", fullname="Andrew Valentine")
    session.add(user)
    session.commit()

# ---------------- QUERY ----------------
users = session.scalars(select(User))

for user in users:
    print(user.name)