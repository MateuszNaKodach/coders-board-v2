type ValueObjectPolicy<T> = (_: T) => void;

function ConcatPolicy<T>(...policy: ValueObjectPolicy<T>[]) {
  return (_: T) => {
    policy.forEach(x => x(_));
  };
}

const EmptyStringPolicy = (name: string) => {
  if (name.length <= 0) {
    throw new Error('Name cannot be empty!');
  }
};

const EmailPolicy = (email: string) => {
  if (!email.includes('@')) {
    throw new Error('Invalid email!');
  }
};

export { ValueObjectPolicy, ConcatPolicy, EmptyStringPolicy, EmailPolicy };
