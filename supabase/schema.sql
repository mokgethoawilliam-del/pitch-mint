-- Database schema setup for PitchMint

-- Create profiles table linked to Supabase auth.users
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  credits integer default 5 not null
);

-- Enable Row-Level Security (RLS)
alter table public.profiles enable row level security;

-- RLS Policies for Profiles
create policy "Allow read of own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Allow update of own profile" on public.profiles
  for update using (auth.uid() = id);

-- Create proposals table linked to profiles
create table if not exists public.proposals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  job_post text not null,
  skills text not null,
  platform text not null,
  tone text not null,
  opener text not null,
  proposal text not null,
  cta text not null,
  questions jsonb not null
);

-- Enable Row-Level Security (RLS) on Proposals
alter table public.proposals enable row level security;

-- RLS Policies for Proposals
create policy "Users can view their own proposals" on public.proposals
  for select using (auth.uid() = user_id);

create policy "Users can insert their own proposals" on public.proposals
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own proposals" on public.proposals
  for delete using (auth.uid() = user_id);


-- AUTOMATIC PROFILE TRIGGER
-- Trigger to automatically create a profile row whenever a new user signs up in Supabase auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, credits)
  values (new.id, new.email, 5);
  return new;
end;
$$ language plpgsql security definer;

-- Remove trigger if it already exists, then recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ────────────────────────────────────────────────
-- PAYMENTS TABLE  (Stripe audit trail)
-- ────────────────────────────────────────────────
create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  stripe_session_id text not null unique,
  pack_id text not null,
  credits_added integer not null,
  amount_cents integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.payments enable row level security;

create policy "Users can view their own payments" on public.payments
  for select using (auth.uid() = user_id);
