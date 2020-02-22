-- Table: public.experiences_calendar

-- DROP TABLE public.experiences_calendar;

CREATE TABLE public.experiences_calendar
(
    exp_id bigint NOT NULL,
    dates jsonb,
    CONSTRAINT experiences_calendar_pkey PRIMARY KEY (exp_id)
)

TABLESPACE pg_default;

ALTER TABLE public.experiences_calendar
    OWNER to student;