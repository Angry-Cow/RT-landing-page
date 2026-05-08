import { useEffect, useRef } from 'react';
import { useLazyQuery, useMutation } from '@animaapp/playground-react-sdk';
import bcrypt from 'bcryptjs';

const INITIAL_USERNAME = 'sasstac_admin';
const INITIAL_PASSWORD = '\\:%HYnE>er-y=)+a';

export default function AdminSetup() {
  const { query } = useLazyQuery('Admin');
  const { create, update } = useMutation('Admin');
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    (async () => {
      try {
        const existing = await query({});
        if (!existing || existing.length === 0) {
          const hash = await bcrypt.hash(INITIAL_PASSWORD, 12);
          await create({
            fullName: 'Site Administrator',
            username: INITIAL_USERNAME,
            passwordHash: hash,
            isMain: 1,
            switch: 1,
            order: 0,
          });
          return;
        }
        const mainAdmin = existing.find((a: any) => a.isMain === 1) || existing[0];
        if (mainAdmin && !mainAdmin.passwordHash.startsWith('$2')) {
          const hash = await bcrypt.hash(INITIAL_PASSWORD, 12);
          await update(mainAdmin.id, { passwordHash: hash });
        }
      } catch {
        // silently fail
      }
    })();
  }, []);

  return null;
}
