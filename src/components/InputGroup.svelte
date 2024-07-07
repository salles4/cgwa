<script>
  export let icon, label, id, comment = "";
</script>

<div class="mb-3 w-100">
  <label for={id} class="form-label">{label}</label>
  <div class="input-group">
    <span class="input-group-text"><i class="bi bi-{icon}"></i></span>
      <slot />
    <div class="form-text">{comment}</div>
  </div>
</div>
