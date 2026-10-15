# ansible-duo_unix

Installs Duo Unix and configures SSH PAM authentication on CentOS Stream and Red Hat
Enterprise Linux 9 and 10. The SSH dependency enables `sshd` at boot without starting
it; configuration changes restart it only when it is already running. The role
installs the Duo SELinux policy persistently and reloads it only when SELinux is
active.

## Variables

- `duo_unix_duo_ikey` is required: a non-empty, single-line Duo integration key.
  Treat it as a secret.
- `duo_unix_duo_skey` is required: a non-empty, single-line Duo secret key.
- `duo_unix_duo_host` is required: the Duo API hostname without a scheme or path.
- `duo_unix_groups` defaults to `""`, requiring Duo for every user reaching Duo
  PAM. Otherwise, supply a single-line string of space-separated pattern lists;
  each list contains comma-separated patterns. Patterns support `*`, `?`, and
  negation with `!`. Include at least one positive pattern, for example
  `"*,!admins guests"`.
- `duo_unix_duo_pushinfo` defaults to `true` (boolean). It includes command
  information in Duo Push messages.
- `duo_unix_duo_failmode` defaults to `secure`, denying access on Duo service or
  configuration errors. Set `safe` to allow access on those errors.
- `duo_unix_duo_prompts` defaults to `3`; it accepts integers `1`, `2`, or `3`.
- `duo_unix_autopush` defaults to `false` (boolean). Set it to `true` to send a
  push request automatically, falling back to a phone call. Prefer
  `duo_unix_duo_prompts: 1` when enabling it.

Run with root privileges, gathered facts, and systemd installed. Store credentials
in Ansible Vault or another secret store. Empty credentials and `null` inputs are
invalid.

The role replaces `/etc/pam.d/sshd` and `/etc/duo/pam_duo.conf`. PAM changes affect
new authentication attempts immediately, without an SSH restart. Keep an alternate
administrative access path while applying them.

The `escapace.ssh` dependency controls which users reach keyboard-interactive PAM.
Its `ssh_keyboard_interactive_group` defaults to `keyboard-interactive`; callers
manage group membership. Coordinate that group with `duo_unix_groups` when
restricting Duo, and account for any `ssh_keyboard_interactive_excluded_cidrs`
bypass configured on the SSH role. For example:

```yaml
- name: configure ssh with duo
  hosts: all
  become: true
  vars:
    duo_unix_duo_ikey: '{{ vault_duo_ikey }}'
    duo_unix_duo_skey: '{{ vault_duo_skey }}'
    duo_unix_duo_host: api-example.duosecurity.com
    duo_unix_groups: keyboard-interactive
    ssh_keyboard_interactive_group: keyboard-interactive
  roles:
    - role: escapace.duo_unix
```
