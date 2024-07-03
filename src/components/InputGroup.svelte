<script>
  export let icon, label, id;
</script>

<div class="input-group mb-3">
  <span class="input-group-text"><i class="bi bi-{icon}"></i></span>
  <div class="form-floating">
    <slot />
    <label for={id}>{label}</label>
  </div>
</div>
